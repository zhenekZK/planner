const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

const {
    createUserDB,
    getUserByEmailDB,
    getAllUsersDB
} = require('../repositories/user');

const createToken = (payload, secret) => {
    return jwt.sign(
        payload,
        secret,
        {
            expiresIn: 31556926 // 1 year in seconds
        }
    );
};

const register = (request, response) => {
    const userData = request.body;

    getUserByEmailDB(userData.email).then(user => {
        if (user) {
            return response.status(400).json({ email: "Email already exists" });
        } else {
            hashPassword(userData.password)
            .then((hashedPassword) => {
                delete userData.password;
                userData.password_digest = hashedPassword
            })
            .then(() => createUserDB(userData))
            .then(user => {
                delete userData.password_digest;

                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                let token = createToken(payload, keys.secretOrKey);

                response.status(201).json({
                    ...user,
                    token: "Bearer " + token
                });
            })
            .catch(err => console.log(err));
        }
    });
};

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
};

const login = (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    // Find user by email
    getUserByEmailDB(email).then(user => {
        // Check if user exists
        if (!user) {
            return response.status(404).json({ message: "Email not found" });
        }

        // Check password
        checkPassword(password, user).then(isMatch => {
            if (isMatch) {
                delete user.password_digest;

                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                let token = createToken(payload, keys.secretOrKey);

                response.json({
                    ...user,
                    token: "Bearer " + token
                });
            } else {
                return response.status(400).json({ message: "Password incorrect" });
            }
        });
    });
};

const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
            if (err) {
                reject(err)
            }
            else if (response) {
                resolve(response)
            } else {
                reject(new Error('Passwords do not match.'))
            }
        })
    )
};

const getAllUsers = (request, response) => {
    return getAllUsersDB()
        .then((users) => response.status(200).json({users}));
};

const profile = (request, response) => {
    response.status(200).json(request.user);
};

module.exports = {
    login,
    register,
    profile,
    getAllUsers
};
