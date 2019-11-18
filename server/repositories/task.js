const database = require('../db/config');

const getTaskDataByIdDB = function (id) {
    return database.select({
        id: 'task.id',
        title: 'task.title',
        description: 'task.description',
        status: 'status.title',
        priority: 'priority.title',
        list_id: 'task.list_id',
        owner_id: 'task.owner_id',
        updatedBy: 'task.updatedby_id'
    }).from('task')
    .where({ 'task.id': id })
    .innerJoin('status', 'task.status_id', 'status.id')
    .innerJoin('priority', 'task.priority_id', 'priority.id')
    .then((data) => {
        return data[0];
    })
};

module.exports = {
    getTaskDataByIdDB
};
