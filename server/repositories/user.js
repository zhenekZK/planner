const database = require('../db/config');

const createUserDB = (user) => {
    return database('users')
        .returning(['id', 'name', 'surname', 'email', 'created_at', 'token'])
        .insert({
            name: user.name,
            surname: user.surname,
            email: user.email,
            password_digest: user.password_digest,
            token: user.token,
            created_at: new Date()
        }).then((data) => data[0]);
};

const getUserByTokenDB = (token) => {
    return database.from('users')
        .select()
        .where({ token })
        .then((data) => data[0])
        .catch(error => {
            console.log(error);
        });
};

const getUserByIdDB = (id) => {
    return database.from('users')
        .select()
        .where({ id })
        .then((data) => data[0]);
};

const getUserIdByTokenDB = (token) => {
    return database.select('id')
        .from('users')
        .where('token', '=', token)
        .then((data) => data[0]);
};

const getUserByEmailDB = (email) => {
    return database.from('users')
        .select()
        .where({ email: email })
        .then((data) => data[0]);
};

const getAssignedUsersDB = (id) => {
    return database.select({
        id: 'users.id',
        name: 'users.name',
        surname: 'users.surname',
        email: 'users.email'
    }).from('users_in_tasks')
        .where({ task_id: id })
        .innerJoin('users', 'users_in_tasks.user_id', 'users.id')
};

const updateUserTokenByIdDB = (token, id) => {
    return database('users')
        .where('id', '=', id)
        .returning(['id', 'name', 'surname', 'email', 'token'])
        .update({ token })
        .then((data) => data[0]);
};

module.exports = {
    getUserByTokenDB,
    getUserByIdDB,
    createUserDB,
    getUserByEmailDB,
    getUserIdByTokenDB,
    updateUserTokenByIdDB,
    getAssignedUsersDB
};
