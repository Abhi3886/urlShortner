const express = require("express");
const {
  handlerGetShortUrl,
  handlerCreateShortUrl,
  getAnalytics,
} = require("../controller/url");

const urlRoute = express.Router();

urlRoute.post("/shorten", handlerCreateShortUrl);
urlRoute.get("/:shortId", handlerGetShortUrl);
urlRoute.get("/analytics/:shortId", getAnalytics);

module.exports = urlRoute;
