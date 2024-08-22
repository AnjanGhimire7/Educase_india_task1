// controllers/schoolController.js
import { mySchool, listmySchools } from "../models/scool.database.js";
import { ApiError } from "../utils/ApiError.js";

// Define error messages
const messages = {
  INVALID_INPUT: "Invalid input provided.",
  DB_ERROR: "Database error occurred.",
};

// Add School Controller
const addSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return next(new ApiError(400, messages.INVALID_INPUT));
  }

  mySchool(name, address, latitude, longitude, (err, schoolId) => {
    if (err) return next(new ApiError(500, messages.DB_ERROR));
    res.status(201).json({ id: schoolId });
  });
};

// List Schools Controller
const listSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;

  // Validate input
  if (isNaN(latitude) || isNaN(longitude)) {
    return next(new ApiError(400, messages.INVALID_INPUT));
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  listmySchools(userLat, userLon, (err, schools) => {
    if (err) return next(new ApiError(500, messages.DB_ERROR));
    res.json(schools);
  });
};

export { addSchool, listSchools };
