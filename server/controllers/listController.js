const environment       = process.env.NODE_ENV || 'development';    // set environment
const configuration     = require('../knexfile')[environment];       // pull in correct db with env configs
const database          = require('knex')(configuration);

const addList = function (request, response) {
    const data = request.body;

    createList(data)
        .then((result) => {
            console.log(result);
            response.status(200).json(result)
        });
};

const removeList = function (request, response) {
    const id = request.body.id;
    return database('list')
        .where('id', id)
        .returning('id')
        .del()
        .then((result) => response.status(200).json(result));
};

const createList = (data) => {
    return database('list')
            .returning(['id', 'title'])
            .insert({ title: data.title }).then((data) => data[0]);
};

const getLists = async function (request, response) {
    return database.from('list')
        .select()
        .then((data) => {
            // console.log(data);
            const listWithTasks = data.map(async (list) => findTasksById(list.id)
                .then((tasks) => fillTasksWithAssigns(tasks))
                .then((tasks) =>  Promise.all(tasks)
                    .then((tasks) => ({ ...list, tasks: [...tasks] })))
            );
            Promise.all(listWithTasks).then((result) => {
                // console.log(result, 'RESULT!!!!!!!!!!');
                response.status(200).json({ lists: result })
            });
        }
        );
};

const fillTasksWithAssigns = function (tasks) {
    return tasks.map(async (task) => selectTaskAssigns(task));
};

const selectTaskAssigns = function (task) {
    return database.select({
        id: 'users.id',
        name: 'users.name',
        surname: 'users.surname',
        email: 'users.email'
    }).from('users_in_tasks')
        .where({ task_id: task.id })
        .innerJoin('users', 'users_in_tasks.user_id', 'users.id')
        .then((data) => {
            // console.log(data, 'USERSINTASKS');
            return { ...task, assigns: [...data] };
        });
};

const findTasksById = function (id) {
    return Promise.resolve(database.select({
        id: 'task.id',
        title: 'task.title',
        description: 'task.description',
        status: 'status.title',
        priority: 'priority.title',
        list: 'task.list_id',
        owner: 'task.owner_id',
        updatedBy: 'task.updatedby_id'
    }).from('task')
        .where({ list_id: id })
        .innerJoin('status', 'task.status_id', 'status.id')
        .innerJoin('priority', 'task.priority_id', 'priority.id')
        .then((data) => {
            // console.log(data, 'TASKS BY ID');
            return data;
        }));
};

module.exports = {
    getLists,
    addList,
    removeList
};
