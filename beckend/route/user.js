const express = require("express");
const { handlerCreateUser, handlerGetUser } = require("../controller/user");

const userRoute = express.Router();

userRoute.post("/signup", handlerCreateUser);
userRoute.post("/login", handlerGetUser);

module.exports = userRoute;
