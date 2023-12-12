const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const { connectToDatabase } = require("./model/index");
const ticketRoutes = require("./routes/route");
const notFound = require("./utils/404");
require("dotenv").config();
const app = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/',ticketRoutes)
app.use("*", notFound);
// golbal error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
// database connection
connectToDatabase();
