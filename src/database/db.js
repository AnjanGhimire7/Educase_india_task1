import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.HOST, //"localhost",
  username: process.env.USERNAME, //"root",
  password: process.env.PASSWORD, //"P@$$word9841",
  database: process.env.DATABASE, //"school_management",
});
// Testing database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Sync models with the database
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced."))
  .catch((err) => console.error("Error syncing database:", err));

export { sequelize };
