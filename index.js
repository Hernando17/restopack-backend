const express = require("express");
const AuthRouter = require("./routes/authRoutes");
const res = require("express/lib/response");
const app = express();
const VERSION = "V1";
const port = 3000;

app.use(AuthRouter);

app.listen(port, () => {
  console.log(`RestoPACK API ${VERSION}`);
});
