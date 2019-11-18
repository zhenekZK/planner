const database = require('../db/config');
const { findUserById } = require('./userController');

const getTasks = function (request, response) {
    return database.select({
        id: 'task.id',
        title: 'task.title',
        description: 'task.description',
        status: 'status.title',
        priority: 'priority.title',
        list_id: 'task.list_id',
        owner_id: 'task.owner_id'
    }).from('task')
        .innerJoin('status', 'task.status_id', 'status.id')
        .innerJoin('priority', 'task.priority_id', 'priority.id')
        .then((data) => {
            const selectUsers = [];
            data.forEach((i) => selectUsers.push(new Promise((resolve, reject) => findUserById(i.owner_id))));
            console.log(data);
            Promise.all(selectUsers).then(() => {
                console.log(data);
            });
            response.status(200).json(data)
        });
};

const addTask = function (request, response) {
    const data = request.body;

    console.log(data, 'DATA FOR TASK');

    const result = [
        database.select('id').from('status').where('title', '=', data.status).then((data) => data[0]),
        database.select('id').from('priority').where('title', '=', data.priority).then((data) => data[0]),
        database.select('id').from('users').where('token', '=', request.decodedToken).then((data) => data[0]),
    ];

    return Promise.all(result).then(ids => {
        return database('task')
            .returning(['id', 'description', 'list_id'])
            .insert({
                title: data.title,
                description: data.description,
                status_id: ids[0].id,
                priority_id: ids[1].id,
                owner_id: ids[2].id,
                updatedby_id: ids[2].id,
                list_id: data.list
            }).then((data) => response.status(200).json(data));
    });
};

const editTask = function (request, response) {
    const data = request.body;

    const result = [
        database.select('id').from('status').where('title', '=', data.status).then((data) => data[0]),
        database.select('id').from('priority').where('title', '=', data.priority).then((data) => data[0]),
        database.select('id').from('users').where('token', '=', request.decodedToken).then((data) => data[0]),
    ];

    return Promise.all(result).then(ids => {
        return database('task')
            .where({ 'id': data.id })
            .update({
                title: data.title,
                description: data.description,
                status_id: ids[0].id,
                priority_id: ids[1].id,
                list_id: data.list,
                updatedby_id: ids[2].id
            })
            .then((data) => {
                    console.log(data);
                    response.status(200).json(data)
                });
            })
            .catch(error => console.log(error));
};

module.exports = {
    getTasks,
    addTask,
    editTask
};
