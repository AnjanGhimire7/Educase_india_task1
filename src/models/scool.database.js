// models/schoolModel.js
import {connection} from "../database/db.js";

// Add a new school
const mySchool = (name, address, latitude, longitude, callback) => {
  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [name, address, latitude, longitude],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.insertId);
    }
  );
};

// List all schools, sorted by distance from the user's location
const listmySchools = (userLat, userLon, callback) => {
  const query = `
        SELECT *, (
            6371 * acos(
                cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
                sin(radians(?)) * sin(radians(latitude))
            )
        ) AS distance
        FROM schools
        ORDER BY distance
    `;

  connection.query(query, [userLat, userLon, userLat], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

export {mySchool, listmySchools}