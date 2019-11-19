const database = require('../db/config');

const getListsDB = () => {
    return database.from('list').select()
};

const createListDB = (data) => {
    return database('list')
        .returning(['id', 'title', 'description', 'createdby_id'])
        .insert({
            title: data.title,
            description: data.description,
            createdby_id: data.createdby_id
        })
        .then(data => data[0]);
};

const deleteListByIdDB = (id) => {
    return database('list')
        .where('id', id)
        .returning('id')
        .del()
};

module.exports = {
    getListsDB,
    createListDB,
    deleteListByIdDB
};
