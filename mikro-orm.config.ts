// mikro-orm.config.ts
import { defineConfig } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';

export default defineConfig({
  driver: MySqlDriver,
  dbName: 'nestjs_blog_app',  // Set your database name directly here
  user: 'root',                // Set your database user directly here
  password: 'charan',   // Set your database password directly here
  host: 'localhost',           // Set your database host directly here
  port: 3306,                  // Set your database port directly here

  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts',],

  debug: true,
  migrations: {
    tableName: 'migrations',
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
  },
});
