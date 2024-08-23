import { DataTypes } from "sequelize";

import { sequelize } from "../database/db.js";
const School = sequelize.define(
  "School",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "schools",
    timestamps: false,
  }
);

export { School };
