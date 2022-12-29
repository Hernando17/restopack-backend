const express = require("express");
const res = require("express/lib/response");
const app = express();
const VERSION = "V1";
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`RestoPACK API ${VERSION}`);
});
