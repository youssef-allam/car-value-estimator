import { DataSource } from 'typeorm';

let dbconfig: any = {
  synchronize: false,
  migrations: ['src/migrations/*{.ts,.js}'],
};

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'], // compiled JS files
    });
    break;
  case 'test':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'test.db.sqlite',
      entities: ['src/**/*.entity.ts'], // raw TS files for tests
    });
    break;
  case 'prod':
    // add production DB config here (e.g. Postgres)
    break;
  default:
    throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
}

export const AppDataSource = new DataSource(dbconfig);
