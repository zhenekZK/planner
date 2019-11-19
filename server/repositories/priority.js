const database = require('../db/config');

const getPriorityIdByTitleDB = (title) => {
    return database.select('id')
        .from('priority')
        .where('title', '=', title)
        .then((data) => data[0])
};

module.exports = {
    getPriorityIdByTitleDB
};
