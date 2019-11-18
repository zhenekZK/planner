const database = require('../db/config');
const { createListDB, deleteListByIdDB } = require('../repositories/list');

const addList = function (request, response) {
    const data = request.body;

    createListDB(data)
        .then((data) => response.status(200).json(data[0]));
};

const removeList = function (request, response) {
    const id = request.body.id;
    deleteListByIdDB(id)
        .then((result) => response.status(200).json(result));
};

const getLists = async function (request, response) {
    return database.from('list')
        .select()
        .then((data) => {
            const listWithTasks = data.map(async (list) => findTasksById(list.id)
                .then((tasks) => fillTasksWithAssigns(tasks))
                .then((tasks) =>  Promise.all(tasks)
                    .then((tasks) => ({ ...list, tasks: [...tasks] })))
            );
            Promise.all(listWithTasks).then((result) => {
                response.status(200).json({ lists: result })
            });
        });
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
        list_id: 'task.list_id',
        owner_id: 'task.owner_id',
        updatedBy: 'task.updatedby_id'
    }).from('task')
        .where({ list_id: id })
        .innerJoin('status', 'task.status_id', 'status.id')
        .innerJoin('priority', 'task.priority_id', 'priority.id')
        .then((data) => {
            return data;
        }));
};

module.exports = {
    getLists,
    addList,
    removeList
};
