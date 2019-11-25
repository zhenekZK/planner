const {
    getListsDB,
    createListDB,
    deleteListByIdDB
} = require('../repositories/list');
const { getTasksByListIdDB } = require('../repositories/task');
const { fillTasksWithAssigns } = require('./taskController');

const addList = function (request, response) {
    const data = request.body;

    let list = {
        ...data,
        createdby_id: request.user.id
    };

    createListDB(list)
        .then((list) => response.status(200).json(list));
};

const removeList = function (request, response) {
    const id = request.body.id;

    // need to add owner/assign validation to pretend
    // deleting if you have no access for list and tasks.
    // also need to do something with task which has list_id of deleting list
    deleteListByIdDB(id)
        .then((result) => response.status(200).json(result));
};

const getLists = async function (request, response) {
    getListsDB()
        .then((lists) => {
            const listWithTasks = lists.map(async (list) =>
                getTasksByListIdDB(list.id)
                    .then((tasks) => fillTasksWithAssigns(tasks))
                    .then((tasks) => ({ ...list, tasks: [...tasks] }))
            );
            Promise.all(listWithTasks).then((result) => {
                response.status(200).json({ lists: result })
            });
        });
};

module.exports = {
    getLists,
    addList,
    removeList
};
