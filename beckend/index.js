require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const urlRoute = require("./route/url");
const userRoute = require("./route/user");

const app = express();
const PORT = process.env.SERVER_PORT;

// middleware for parsing clinet request body in Json
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you deal with cookies or authorization headers
  })
);

app.get("/", (req, res) => {
  res.status(200).send("connecting to ...");
});

app.use("/url", urlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`connected to the server at PORT:${PORT}`);
});
