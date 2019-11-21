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
    const { assigns, ...anotherData } = data;
    console.log(anotherData, 'Another data');
    console.log(data, 'Data');

    return database('task')
        .returning(['id'])
        .insert({
            ...anotherData
        })
        .then((data) => data[0].id)
        .then((task_id) => Promise.all(
            assigns.map(user_id => setAssignDB(user_id, task_id))
        ).then(() => ({ id: task_id })));
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

const setAssignDB = (user_id, task_id) => {
    return database('users_in_tasks')
        .returning(['user_id', 'task_id'])
        .insert({
            user_id,
            task_id
        }).then((data) => data[0]);
};

const getAssignsDB = (task_id) => {
    return database.select({
        id: 'users.id',
        name: 'users.name',
        surname: 'users.surname',
        email: 'users.email'
    }).from('users_in_tasks')
        .where({ task_id })
        .innerJoin('users', 'users_in_tasks.user_id', 'users.id')
};

module.exports = {
    createTaskDB,
    getTasksDB,
    updateTaskDB,
    getTaskDataByIdDB,
    getTasksByListIdDB,
    deleteTaskByIdDB,
    setAssignDB,
    getAssignsDB
};
