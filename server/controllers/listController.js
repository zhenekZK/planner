const {
    getListsDB,
    createListDB,
    deleteListByIdDB
} = require('../repositories/list');
const { getTasksByListIdDB } = require('../repositories/task');
const {
    getUserIdByTokenDB,
    getAssignsDB
} = require('../repositories/user');
const { fillTasksWithAssigns } = require('./taskController');

const addList = function (request, response) {
    const data = request.body;

    getUserIdByTokenDB(request.decodedToken).then(id => data.createdby_id = id)
        .then(() => createListDB(data))
        .then((list) => response.status(200).json(list));
};

const removeList = function (request, response) {
    const id = request.body.id;
    deleteListByIdDB(id)
        .then((result) => response.status(200).json(result));
};

const getLists = async function (request, response) {
    getListsDB()
        .then((data) => {
            const listWithTasks = data.map(async (list) =>
                getTasksByListIdDB(list.id)
                    .then((tasks) => fillTasksWithAssigns(tasks))
                    .then((tasks) =>
                        Promise.all(tasks)
                            .then((tasks) => ({ ...list, tasks: [...tasks] })))
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
