const { DataSource } = require('typeorm');
const path = require('path');
const { ConfigService } = require('@nestjs/config');
const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [path.resolve(__dirname, 'entities', '**', '*.entity.js')],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '2204',
//   database: 'mouvy',
//   entities: [path.resolve(__dirname, 'entities', '**', '*.entity.js')],
//   migrations: ['src/migrations/*.ts'],
//   synchronize: false,
//   logging: true,
});

module.exports = AppDataSource;
