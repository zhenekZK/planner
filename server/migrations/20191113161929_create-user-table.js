
exports.up = function(knex) {
    let createQuery = `CREATE TABLE user(
    id SERIAL PRIMARY KEY NOT NULL,
    title TEXT
  )`;
    return knex.raw(createQuery);
};

exports.down = function(knex) {
    let dropQuery = `DROP TABLE user`;
    return knex.raw(dropQuery);
};
