const express = require("express");
const app = express();
const path = require('path');
const http = require("http");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes")
const departmentsRoutes = require("./routes/departmentsRoutes")
const EmployeeRoutes = require("./routes/employeeRoutes");
const verifyToken = require("./middileware/chekAuth");

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use("/api/user" , authRoutes)
app.use("/api/department",verifyToken  , departmentsRoutes)
app.use("/api/employee" ,verifyToken , EmployeeRoutes)

app.get("/" ,(req,res)=>{
  res.send("hello node js")
})

// db connection
main().catch((err) => console.log(err));
async function main() {
    mongoose
      .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
      .then(() => {
        console.log("mongo_db connected");
      });
  }

  const htttpServer = http.createServer(app);
  htttpServer.listen(port, () => {
    console.log("Server is running on port 4000");
  });
