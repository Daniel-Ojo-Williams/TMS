import { Sequelize } from "sequelize-typescript";
import 'dotenv/config';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  logging: false,
  port: Number(process.env.DB_PORT),
  models: [__dirname + "/../**/*.model.ts"]
});

const connectDB = () => sequelize.authenticate().then(() => sequelize.sync({
  alter: true,
}))

export default connectDB;
