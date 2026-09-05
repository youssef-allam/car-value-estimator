const { DataSource } = require('typeorm');

let dbconfig = {
  synchronize: false,
  migrations: ['**/migrations/*.js'], // compiled migrations
};

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'], // compiled entities
    });
    break;
  case 'test':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'test.db.sqlite',
      entities: ['src/**/*.entity.ts'], // raw TS for tests
      migrationsRun: true, // run migrations automatically for tests
    });
    break;
  case 'prod':
    Object.assign(dbconfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['**/*.entity.js'], // compiled entities
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
}

const AppDataSource = new DataSource(dbconfig);
module.exports = { AppDataSource };
