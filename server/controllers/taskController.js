const {
    getUserByIdDB,
    getUserIdByTokenDB,
    getAssignsDB
} = require('../repositories/user');
const {
    getTaskDataByIdDB,
    getTasksDB,
    createTaskDB,
    updateTaskDB
} = require('../repositories/task');
const { getStatusIdByTitleDB } = require('../repositories/status');
const { getPriorityIdByTitleDB } = require('../repositories/priority');

const getTasks = function (request, response) {
    getTasksDB()
        .then((data) => {
            const selectUsers = [];
            data.forEach((task) => selectUsers.push(getUserByIdDB(task.owner_id)));
            console.log(data);
            Promise.all(selectUsers).then(() => {
                console.log(data);
            });
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
            status_id: ids[0].id,
            priority_id: ids[1].id,
            owner_id: ids[2].id,
            updatedby_id: ids[2].id,
            list_id: data.list
        };

        createTaskDB(task)
            .then((data) => {
                getTaskDataByIdDB(data.id).then(data => {
                    response.status(200).json(data);
                })
            });
    });
};

const removeTask = function(request, response) {

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
                    console.log(result);
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
        .then((data) => {
            console.log(task, 'TASK');
            console.log(data, 'INSERTASSIGNS');
            console.log({ ...task, assigns: [...data] }, 'CONCAT');
            return { ...task, assigns: [...data] };
        });
};

module.exports = {
    getTasks,
    addTask,
    removeTask,
    editTask,
    fillTasksWithAssigns
};
