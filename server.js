const express = require("express");
const route = require("./route/uploadRoute");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const app = express();
dbConnect();
app.use(express.json());

app.use("/", route);

app.listen(process.env.PORT, () => {
  console.log("Server is Running at Port " + process.env.PORT);
});
