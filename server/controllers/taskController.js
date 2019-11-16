const database = require('../db/config');
const { findUserById } = require('./userController');

const getTasks = function (request, response) {
    return database.select({
        id: 'task.id',
        title: 'task.title',
        description: 'task.description',
        status: 'status.title',
        priority: 'priority.title',
        list: 'task.list_id',
        owner: 'task.owner_id'
    }).from('task')
        .innerJoin('status', 'task.status_id', 'status.id')
        .innerJoin('priority', 'task.priority_id', 'priority.id')
        .then((data) => {
            const selectUsers = [];
            data.forEach((i) => selectUsers.push(new Promise((resolve, reject) => findUserById(i.owner))));
            console.log(data);
            Promise.all(selectUsers).then(() => {
                console.log(data);
            });
            response.status(200).json(data)
        });
};

module.exports = {
    getTasks
};
