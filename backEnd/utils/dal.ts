import mysql from "mysql";
import config from "./config";

// Creating a connection object:
const connection = mysql.createConnection({
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  database: config.mysqlDatabase,
  socketPath: "/tmp/mysql.sock",
});

function execute(sql: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    // To Promisify an asynchronous function

    // Execute the sql on MySQL:
    connection.query(sql, (err, result) => {
      // If there is an error:
      if (err) {
        reject(err);
        return;
      }

      // No error - report data:
      resolve(result);
    });
  });
}

// Connecting to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL");
});

export default {
  execute,
};
