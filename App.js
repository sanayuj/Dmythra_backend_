const express = require("express");
const app = express();
const dbConnection = require("./Config/dbConnection");
const userRouters = require("./Routes/userRoutes");
const adminRouters = require("./Routes/adminRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

//database connection
dbConnection.dbConnect();
//connection function
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(__dirname + "/public/images"));

app.use("/", userRouters);
app.use("/admin", adminRouters);

app.listen(4000, () => {
  console.log("backend is running in the port of 4000");
});
