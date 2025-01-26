import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB = {};

// Use SSL settings in Sequelize options
DB.sequelize = new Sequelize(
  process.env.POSTGRE_URI,{
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL
        rejectUnauthorized: false, // Allow self-signed certificates (if needed)
      },
    },
  }
);

DB.user = DB.sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

DB.gadget = DB.sequelize.define("gadget", {
  gadgetId: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  codename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM(
      "Available",
      "Deployed",
      "Destroyed",
      "Decommissioned"
    ),
    allowNull: false,
    defaultValue: "Available",
  },
});

export default DB;
