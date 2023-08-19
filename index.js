const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const AuthRouter = require("./routes/authRoutes");
const TableRouter = require("./routes/tableRoutes");
const UserRouter = require("./routes/userRoutes");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {};

const openapiSpecification = swaggerJsdoc(require("./apidocs.json"));

const VERSION = "V1";
const baseURL = `http://localhost:${process.env.PORT}/`;

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(cors());
app.use(express.json());
app.use(AuthRouter);
app.use(TableRouter);
app.use(UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`RestoPACK API ${VERSION} in ${baseURL}`);
});
