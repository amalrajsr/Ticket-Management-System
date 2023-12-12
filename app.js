const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectToDatabase = require("./config/database");
const ticketRoutes=require('./routes/route')
const notFound=require('./utils/404')
require("dotenv").config();
const app = express();
const port = process.env.port;

app.use(cors); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api/v1/tickets',ticketRoutes)
app.use('*',notFound)
// golbal error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on prot ${port}`);
});
// database connection
connectToDatabase();
