const { getUserIdByTokenDB } = require('../repositories/user');
const {
    getTaskDataByIdDB,
    getTasksDB,
    createTaskDB,
    updateTaskDB,
    deleteTaskByIdDB,
    getAssignsDB
} = require('../repositories/task');
const { getStatusIdByTitleDB } = require('../repositories/status');
const { getPriorityIdByTitleDB } = require('../repositories/priority');

const getTasks = function (request, response) {
    getTasksDB()
        .then((data) => {
            response.status(200).json(data)
        });
};

const addTask = function (request, response) {
    const data = request.body;

    const result = [
        getStatusIdByTitleDB(data.status),
        getPriorityIdByTitleDB(data.priority),
        getUserIdByTokenDB(request.decodedToken)
    ];

    return Promise.all(result).then(ids => {
        const task = {
            title: data.title,
            description: data.description,
            status_id: ids[0],
            priority_id: ids[1],
            owner_id: ids[2],
            updatedby_id: ids[2],
            list_id: data.list_id,
            assigns: data.assigns
        };

        createTaskDB(task)
            .then((data) => {
                console.log(data);
                getTaskDataByIdDB(data.id).then(data => {
                    console.log(data, 'Data before sending back');
                    response.status(200).json(data);
                })
            });
    });
};

const removeTask = function(request, response) {
    const data = request.body;

    // need to add owner/assign validation to pretend
    // deleting if you have no access for task
    deleteTaskByIdDB(data.id)
        .then((id) => response.status(200).json({ id }));

};

const editTask = function (request, response) {
    const data = request.body;

    const result = [
        getStatusIdByTitleDB(data.status),
        getPriorityIdByTitleDB(data.priority),
        getUserIdByTokenDB(request.decodedToken)
    ];

    return Promise.all(result).then(ids => {
        const task = {
            id: data.id,
            title: data.title,
            description: data.description,
            status_id: ids[0],
            priority_id: ids[1],
            list_id: data.list,
            updatedby_id: ids[2]
        };

        return updateTaskDB(task)
            .then(() => getTaskDataByIdDB(data.id))
            .then((updatedTask) => insertAssignsIntoTask(updatedTask))
            .then((result) => {
                    response.status(200).json(result)
                });
            })
            .catch(error => console.log(error));
};

const fillTasksWithAssigns = function (tasks) {
    return tasks.map(async (task) => insertAssignsIntoTask(task));
};

const insertAssignsIntoTask = function (task) {
    return getAssignsDB(task.id)
        .then((data) => ({ ...task, assigns: [...data] }));
};

module.exports = {
    getTasks,
    addTask,
    removeTask,
    editTask,
    fillTasksWithAssigns
};
