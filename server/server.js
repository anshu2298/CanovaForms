const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectCloudinary = require("./config/cloudinary.js");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/mongodb.js");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const projectRouter = require("./routes/projectRoutes.js");
const formRouter = require("./routes/formRoutes.js");
const mediaRouter = require("./routes/mediaRoutes.js");
const url = process.env.DB_URI;
const app = express();
const port = process.env.PORT || 3000;

// const allowedOrigins = ["http://localhost:5173"];
const allowedOrigins = [
  "https://canova-forms-frontend-28m5ae514-anshus-projects-bf8d6507.vercel.app",
];
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
app.use("/api/project", projectRouter);
app.use("/api/form", formRouter);
app.use("/api/media", mediaRouter);

const start = async () => {
  try {
    connectdb(url).then(() => {
      console.log("Connected to DB....");
    });
    await connectCloudinary();
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
