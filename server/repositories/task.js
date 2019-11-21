const database = require('../db/config');

const getTasksDB = function () {
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
};

const createTaskDB = function (data) {
    return database('task')
        .returning(['id'])
        .insert({
            ...data
        })
        .then((data) => data[0])
};

const updateTaskDB = function (data) {
    const { id, ...anotherData } = data;
    return database('task')
        .where({ 'id': id })
        .update({
            ...anotherData
        })
};

const getTaskDataByIdDB = function (id) {
    return database.select({
        id: 'task.id',
        title: 'task.title',
        description: 'task.description',
        status: 'status.title',
        priority: 'priority.title',
        list_id: 'task.list_id',
        owner_id: 'task.owner_id',
        updatedby_id: 'task.updatedby_id'
    }).from('task')
    .where({ 'task.id': id })
    .innerJoin('status', 'task.status_id', 'status.id')
    .innerJoin('priority', 'task.priority_id', 'priority.id')
    .then((data) => data[0])
};

const getTasksByListIdDB = function (id) {
    return database.select({
        id: 'task.id',
        title: 'task.title',
        description: 'task.description',
        status: 'status.title',
        priority: 'priority.title',
        list_id: 'task.list_id',
        owner_id: 'task.owner_id',
        updatedby_id: 'task.updatedby_id'
    }).from('task')
        .where({ list_id: id })
        .innerJoin('status', 'task.status_id', 'status.id')
        .innerJoin('priority', 'task.priority_id', 'priority.id')
        .then((data) => data);
};

const deleteTaskByIdDB = (id) => {
    return database('task')
        .where('id', id)
        .returning('id')
        .del()
        .then((data) => data[0])
        .then((id) =>
            database('users_in_tasks')
                .where('task_id', id)
                .del()
                .then(() => id)
        );
};

module.exports = {
    createTaskDB,
    getTasksDB,
    updateTaskDB,
    getTaskDataByIdDB,
    getTasksByListIdDB,
    deleteTaskByIdDB
};
