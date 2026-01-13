const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Receipt Parser API",
            version: "1.0.0",
            description: "OCR-based receipt parsing",
        },
        servers: [{url: "http://localhost:3000"}],
    },
    apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);
