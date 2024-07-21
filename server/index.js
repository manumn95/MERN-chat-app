const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");
const path = require('path')
// const app = express()
app.use(express.json());
const _dirname=path.dirname('')
const buildpath = path.join(_dirname,'../client/build')
app.use(express.static(buildpath))

app.use((req, res, next) => {
  console.log('Incoming Request: ', req.method, req.url, req.headers.origin);
  next();
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

//api endpoints
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
