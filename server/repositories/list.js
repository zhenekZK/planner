const database = require('../db/config');

const getListsDB = () => {
    return database.from('list').select()
};

const createListDB = (data) => {
    return database('list')
        .returning(['id', 'title'])
        .insert({ title: data.title })
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
