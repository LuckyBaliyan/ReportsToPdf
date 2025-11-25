const express = require("express");
const path = require("path");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));



