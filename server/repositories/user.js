const database = require('../db/config');

const createUserDB = (user) => {
    return database('users')
        .returning(['id', 'name', 'surname', 'email', 'created_at'])
        .insert({
            name: user.name,
            surname: user.surname,
            email: user.email,
            password_digest: user.password_digest,
            created_at: new Date()
        }).then((data) => data[0]);
};

const getUserByTokenDB = (token) => {
    return database.from('users')
        .select()
        .where({ token })
        .then((data) => data[0]);
};

const getUserByIdDB = (id) => {
    return database.from('users')
        .select()
        .where({ id })
        .then((data) => data[0]);
};

const getUserByEmailDB = (email) => {
    return database.from('users')
        .select()
        .where({ email: email })
        .then((data) => data[0]);
};

module.exports = {
    getUserByTokenDB,
    getUserByIdDB,
    createUserDB,
    getUserByEmailDB
};
