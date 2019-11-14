const environment       = process.env.NODE_ENV || 'development';    // set environment
const configuration     = require('../knexfile')[environment];       // pull in correct db with env configs
const database          = require('knex')(configuration);
const { authenticate }  = require('./userController');

const addList = function (request, response) {
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
    return database('list')
            .returning(['id', 'title'])
            .insert({ title: data.title }).then((data) => data[0]);
};

const getLists = function (request, response){
    pool.query('SELECT * FROM list', (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(results.rows);
    })
};

module.exports = {
    getLists,
    addList
};
