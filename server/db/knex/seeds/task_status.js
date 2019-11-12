
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task_status').del()
    .then(function () {
      // Inserts seed entries
      return knex('task_status').insert([
        { title: 'open'},
        { title: 'processing'},
        { title: 'done'}
      ]);
    });
};
