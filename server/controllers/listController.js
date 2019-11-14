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
        .then((data) => response.status(200).json(data));
};

module.exports = {
    getLists,
    addList
};
