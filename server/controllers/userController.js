const bcrypt = require('bcrypt');
const crypto = require('crypto');

const {
    createUserDB,
    getUserByTokenDB,
    updateUserTokenByIdDB,
    getUserByEmailDB
} = require('../repositories/user');

const signup = (request, response) => {
    const user = request.body;

    hashPassword(user.password)
        .then((hashedPassword) => {
            delete user.password;
            user.password_digest = hashedPassword
        })
        .then(() => createToken())
        .then(token => user.token = token)
        .then(() => createUserDB(user))
        .then(user => {
            delete user.password_digest;
            response.header("Access-Control-Allow-Origin", "*");
            response.status(201).json({ user })
        })
        .catch((err) => console.error(err))
};

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
};

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    });
};

const signin = (request, response) => {
    const data = request.body;
    let user;

    getUserByEmailDB(data.email)
        .then(foundUser => {
            user = foundUser;
            return checkPassword(data.password, foundUser)
        })
        .then(() => createToken())
        .then(token => updateUserTokenByIdDB(token, user.id))
        .then(() => {
            delete user.password_digest;
            response.header("Access-Control-Allow-Origin", "*");
            response.status(200).json(user)
        })
        .catch((err) => console.error(err))
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

const profile = (request, response) => {
    const token = request.body.token || request.decodedToken;

    getUserByTokenDB(token)
        .then((user) => {
            response.status(200).json(user)
        })
};

module.exports = {
    signup,
    signin,
    profile
};
