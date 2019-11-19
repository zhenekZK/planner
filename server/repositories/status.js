const database = require('../db/config');

const getStatusIdByTitleDB = (title) => {
    return database.select('id')
        .from('status')
        .where('title', '=', title)
        .then((data) => data[0].id)
};

module.exports = {
    getStatusIdByTitleDB
};
