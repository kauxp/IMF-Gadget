import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Impossible Missions Force (IMF) Super Secret Gadgets API",
      version: "0.1.0",
      description:
        "This piece of technology is so advanced that it can only be accessed by the Impossible Missions Force (IMF). It contains a list of super secret gadgets that are used by IMF agents to carry out their missions. This API is not for the faint of heart.",
      contact: {
        name: "Paramjeet Kaur (Chief IMF Technologist)",
        email: "paramjeetkaur4326@gmail.com",
      },
    },
  },
  apis: ["./src/swagger-docs.yaml"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
