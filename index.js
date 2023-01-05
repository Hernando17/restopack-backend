const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const AuthRouter = require("./routes/authRoutes");
const TableRouter = require("./routes/tableRoutes");
const app = express();
const VERSION = "V1";
const baseURL = `http://localhost:${process.env.PORT}/`;

app.use(express.json());
app.use(AuthRouter);
app.use(TableRouter);

app.listen(process.env.PORT, () => {
  console.log(`RestoPACK API ${VERSION} in ${baseURL}`);
});
