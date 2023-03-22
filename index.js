const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const app = express();
const port = 8080;
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("we are connected with database");
});


const subscriberRoutes = require("./routes/subscriberRoutes")

app.use("/subscribers", subscriberRoutes)

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
