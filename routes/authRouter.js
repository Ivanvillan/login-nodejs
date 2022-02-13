const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/authService');
const service = new AuthService();
const router = express.Router();

router.post('/login',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            res.json(service.signToken(user[0]))
        } catch (error) {
            next(error);
        }
    }
);

router.post('/linkrecovery',
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const result = await service.sendLinkRecovery(email)
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/changepassword',
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body;
            const result = service.changePassword(token, newPassword);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
