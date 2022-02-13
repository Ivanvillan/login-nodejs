const nodemailer = require('nodemailer');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');
const connection = require('./../lib/database');

const UserService = require('./usersService');
const service = new UserService();


class AuthService {
    constructor() {

    }
    async getUser(email, password) {
        const user = await service.getByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user[0].password;
        return user;
    }

    signToken (user) {
        const payload = {
            sub: user.iduser,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwt_secret);
        return {
            user,
            token
        };
    }

    async sendLinkRecovery(email) {
        const user = await service.getByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        console.log(user[0]);
        const payload = {
            sub: user[0].iduser
        }
        const token = jwt.sign(payload, config.jwt_secret, { expiresIn: '10min' });
        const sql = `UPDATE users SET recoveryToken = ? WHERE iduser = ?`;
        await connection.query(sql, [token, user[0].iduser]);
        const link = `https://linkrecovery.com.ar/recovery?token=${token}`;
        const mail = {
            from: config.smtp_email,
            to: config.smtp_email,
            subject: 'Email para recuperar contraseña',
            html: `<b> Ingresar a este link => ${link}</b>`
        }
        const result = await this.sendEmail(mail);
        return result;
    }
    async sendEmail(bodyMail) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
              user: config.smtp_email,
              pass: config.smtp_password
            }
          });
          await transporter.sendMail(bodyMail);
          return { message: 'mail sent' };
    }
    async changePassword(token, newPassword) {
        try {
            const payload = jwt.verify(token, config.jwt_secret);
            const user = await service.getByID(payload.sub);
            if (user[0].recoveryToken !== token) {
                throw boom.unauthorized();
            }
            const hash = await bcrypt.hash(newPassword, 10);
            const sql = `UPDATE users SET password = ?, recoveryToken = ? WHERE iduser = ?`;
            connection.query(sql, [hash, null, user[0].iduser]);
            return { message: 'Password changed' };
        } catch (error) {
            throw boom.unauthorized(error);
        }
    }
}

module.exports = AuthService;
