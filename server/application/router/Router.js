const express = require("express");
const router = express.Router();

const notFoundHandler = require("./handlers/notFoundHandler");

function Router() {
    router.all("/*", notFoundHandler);
    return router;
}

module.exports = Router;
