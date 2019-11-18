const database = require('../db/config');
const bcrypt = require('bcrypt');                        // bcrypt will encrypt passwords to be saved in db
const crypto = require('crypto');

const { createUserDB, getUserByTokenDB } = require('../repositories/user');

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
    const userReq = request.body;
    let user;

    findUser(userReq)
        .then(foundUser => {
            user = foundUser;
            return checkPassword(userReq.password, foundUser)
        })
        .then((res) => createToken())
        .then(token => updateUserToken(token, user))
        .then(() => {
            delete user.password_digest;
            response.header("Access-Control-Allow-Origin", "*");
            response.status(200).json(user)
        })
        .catch((err) => console.error(err))
};

const findUser = (userReq) => {
    return database.from('users')
        .select()
        .where({ email: userReq.email })
        .then((data) => data[0]);
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

const updateUserToken = (token, user) => {
    return database('users')
        .where('id', '=', user.id)
        .returning(['id', 'name', 'surname', 'email', 'token'])
        .update({ token })
        .then((data) => data[0]);
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
