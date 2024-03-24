"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var todoRoute_1 = require("./routes/todoRoute");
var middleware_1 = require("./middleware");
var authentication_1 = require("./routes/authentication");
require('dotenv').config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send({ message: "hello from home page" });
});
app.use('/auth', authentication_1.default);
app.use('/todo', middleware_1.default, todoRoute_1.default);
app.listen(PORT, function () {
    console.log("server is running on port ".concat(PORT));
});
