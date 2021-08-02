const express = require("express");
const router = express.Router();
const { models } = require("./sequelize-setup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { NoUnusedFragmentsRule } = require("graphql");

const { User } = models;

router.post("/signup", (req, res) => {
    permissions = []
    bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) console.log(error);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            defaultCurrency: req.body.default_currency
        })
        .then(user => {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                default_currency: user.defaultCurrency,
                permissions: permissions
            }
            const options = {
                algorithm: "HS256",
                expiresIn: "2 days",
            }
            const token = jwt.sign(payload, 'a_terrible_secret', options);
            console.log('Token', token);
            res.status(201).send({
                name: user.name, 
                email: user.email, 
                default_currency: user.defaultCurrency, 
                token: token
            });
        })
        .catch(error => res.status(400).send(error));
    })
});


router.post("/login", (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (user === null) {
                res.status(401).send({
                    message: `User with email '${req.body.email}' doesn't exist.`
                });
            }
            else {
                bcrypt.compare(req.body.password, user.password, (error, success) => {
                    if (error) {
                        return res.status(400).send({
                            message: `BCRYPT: ${error}`
                        })
                    }
                    // Passwords are the same
                    if (success) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            default_currency: user.defaultCurrency
                        }
                        const options = {
                            algorithm: "HS256",
                            expiresIn: "2 days",
                        }
                        const token = jwt.sign(payload, 'a_terrible_secret', options);
                        return res.status(201).send({
                            name: user.name, 
                            email: user.email, 
                            default_currency: user.defaultCurrency, 
                            token: token
                        });
                    }
                    else {
                        return res.status(401).send({
                            message: `Incorrect password`
                        })
                    }
                });
            }
        })
        .catch (error => {
            console.log(error);
            return res.status(400).send({
                message: `Server: ${error}`
            });
        });
});

module.exports = router;