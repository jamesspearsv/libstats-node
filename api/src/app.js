const express = require("express");
const cors = require("cors");
const appRouter = require("./routes/appRoutes");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.NODE_PORT || 3001;

const origins = process.env.ORIGINS
  ? process.env.ORIGINS.split(",")
  : ["http://localhost:3000"];

// Enable CORS for server
app.use(
  cors({
    origin: origins,
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// Enable app to parse json and encoded form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// request logger
app.use((req, res, next) => {
  console.log(`${new Date().toDateString()} -- ${req.method} ${req.url}`);
  next();
});

// Configure routers
app.use("/app", appRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// ** ERROR MIDDLEWARE ** //
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Server Error" });
});

app.listen(PORT, () => {
  console.log();
  console.log(`>> Running in ${NODE_ENV} mode`);
  console.log(`>> Server listening on port ${PORT}`);
  console.log();
});
