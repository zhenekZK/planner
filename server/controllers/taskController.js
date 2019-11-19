const {
    getUserByIdDB,
    getUserIdByTokenDB
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
        const updatedTask = {
            id: data.id,
            title: data.title,
            description: data.description,
            status_id: ids[0].id,
            priority_id: ids[1].id,
            list_id: data.list,
            updatedby_id: ids[2].id
        };

        updateTaskDB(updatedTask)
            .then((data) => {
                    response.status(200).json(data)
                });
            })
            .catch(error => console.log(error));
};

module.exports = {
    getTasks,
    addTask,
    removeTask,
    editTask
};
