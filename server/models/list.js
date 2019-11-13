const environment       = process.env.NODE_ENV || 'development';    // set environment
const configuration     = require('../knexfile')[environment];       // pull in correct db with env configs
const database          = require('knex')(configuration);
const { authenticate }  = require('./user');

const addList = (request, response) => {
    const data = request.body;
    const token = request.body.token || request.decoded;

    authenticate(token)
        .then(result => {
            if (result) {
                createList(data)
                    .then((result) => {
                        console.log(result);
                        response.status(200).json(result)
                    });
            } else {
                console.log('ERROR!');
                response.status(404).json({
                    message: 'Problem with list creation!',
                    type: 'error'
                });
            }
        })
};

const createList = (data) => {
    return database.raw(
        "INSERT INTO list (title) VALUES (?) RETURNING id, title",
        [data.title]
    ).then((data) => data.rows[0]);
};

module.exports = {
    addList
};
