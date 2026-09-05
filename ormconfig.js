var dbconfig = {
    synchronize: false,
};


switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'test.db.sqlite',
      entities: ['**/*.entity.ts'],
    });  
    break;
  case 'prod':
    break;
default:
    throw new Error('Unknown environment');
}

module.exports = dbconfig;


