const express = require("express");
const receiptRoutes = require("./routes/receiptRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// TODO: Middleware

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/receipts", receiptRoutes);

module.exports = app;
