require('dotenv').config();

const config = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    pass: process.env.PASSWORD_DB,
    db: process.env.DATABASE,
    port: process.env.PORT,
    api_key: process.env.API_KEY,
    jwt_secret: process.env.JWT_SECRET,
    smtp_email: process.env.SMTP_EMAIL,
    smtp_password: process.env.SMTP_PASSWORD
}

module.exports = { config };