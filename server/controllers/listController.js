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

const createList = (data) => {
    return database('list')
            .returning(['id', 'title'])
            .insert({ title: data.title }).then((data) => data[0]);
};

const getLists = function (request, response) {
    return database.from('list')
        .select()
        .then((data) => {
            console.log(data);
            const listWithTasks = data.map(async (list) => findTasksById(list.id)
                .then(tasks => {
                    console.log(list);
                    return { ...list, tasks: [...tasks] }
                })
            );
            console.log(listWithTasks);
            Promise.all(listWithTasks).then((result) => {
                console.log(result, 'RESULT ALLO');
                response.status(200).json({ lists: result });
            });
        }
        );
};

const findTasksById = function (id) {
    return database.select({
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
            console.log(data);
            return data;
        });
};

module.exports = {
    getLists,
    addList
};
