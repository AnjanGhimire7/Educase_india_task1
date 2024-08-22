// Create a single connection
import mysql2 from "mysql2";

  const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "P@$$word9841",
    database: "school_managment",
  });

  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    }
    console.log("Connected to the database");
  });

export {connection};
