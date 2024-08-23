import { School } from "../models/school.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Helper function to calculate distance between two points
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

// Add a new school
export const addSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    throw new ApiError(400, "All fields are required.");
  }

  const school = await School.create({ name, address, latitude, longitude });
  res
    .status(201)
    .json(new ApiResponse(201, school, "School added successfully."));
});

// List schools sorted by proximity with pagination
export const listSchools = asyncHandler(async (req, res) => {
  const { lat, lon, page = 1, size = 10 } = req.query;
  const limit = parseInt(size, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  if (!lat || !lon) {
    throw new ApiError(400, "Latitude and longitude are required.");
  }

  const schools = await School.findAll();
  const sortedSchools = schools
    .map((school) => ({
      ...school.dataValues,
      distance: getDistance(lat, lon, school.latitude, school.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);

  // Apply pagination
  const paginatedSchools = sortedSchools.slice(offset, offset + limit);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        page: parseInt(page, 10),
        size: parseInt(size, 10),
        total: sortedSchools.length,
        data: paginatedSchools,
      },
      "Schools retrieved successfully."
    )
  );
});
