// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'me',
      password : 'localbear',
      database : 'planner_api',
      charset: 'utf8'
    },
    migrations: {
      tableName: __dirname + '/db/knex/migrations'
    },
    seeds: {
      directory: __dirname + '/db/knex/seeds'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'planner_api',
      user:     'me',
      password: 'localbear'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'planner_api',
      user:     'me',
      password: 'localbear'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
