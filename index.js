require("dotenv").config({ quiet: true });

const express = require("express");
const urlRoute = require("./route/url");

const app = express();
const PORT = process.env.SERVER_PORT;

// middleware for parsing clinet request body in Json
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("connecting to ...");
});

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`connected to the server at PORT:${PORT}`);
});
