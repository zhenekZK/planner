const {
    getListsDB,
    createListDB,
    deleteListByIdDB
} = require('../repositories/list');
const {
    getTasksByListIdDB,
    getAssignedUsersDB
} = require('../repositories/task');

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
    getListsDB()
        .then((data) => {
            const listWithTasks = data.map(async (list) => getTasksByListIdDB(list.id)
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
    getAssignedUsersDB(task.id)
        .then((data) => {
            return { ...task, assigns: [...data] };
        });
};

module.exports = {
    getLists,
    addList,
    removeList
};
