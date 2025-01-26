import express from "express";
import DB from "./db/index.js";
import gadgetRouter from "./routes/gadget.route.js";
import authRouter from "./routes/auth.route.js";
import authToken from "./middleware/authToken.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerDocs } from "./swagger-options.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/gadgets", authToken, gadgetRouter);

swaggerDocs(app);

DB.sequelize.sync({ alter: true }).then(() => {
  DB.sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
