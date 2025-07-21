const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectdb = require("./config/mongodb.js");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const url = process.env.DB_URI;
const app = express();
const port = process.env.PORT || 3000;

// const allowedOrigins = "*";
const allowedOrigins = ["http://localhost:5173"];
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ origin: allowedOrigins, credentials: true })
);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const start = async () => {
  try {
    connectdb(url).then(() => {
      console.log("Connected to DB....");
    });
    app.listen(
      port,
      console.log(
        `Server is running on port: http://localhost:${port}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
