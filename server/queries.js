const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'planner_api',
    password: 'localbear',
    port: 5432,
});

const getLists = (request, response) => {
    pool.query('SELECT * FROM status', (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(results.rows);
    })
};

module.exports = {
    getLists
};
