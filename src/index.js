const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("App running on localhost:3000");
});
