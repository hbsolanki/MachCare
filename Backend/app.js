require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;

// requiring necessary dependencies
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// connecting to mongoose server
main()
  .then(() => console.log("db connection established"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

// using cors to avoid CORS ERROR
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// require routers
const userRouter = require("./Router/user");
const dealerRouter = require("./Router/dealer");
const mechanicRouter = require("./Router/mechanic");
const AdminRouter = require("./Router/admin");
const dbVerify = require("./auth/DBverify");

app.use("/user", userRouter);
app.use("/mechanic", mechanicRouter);
app.use("/dealer", dealerRouter);
app.use("/admin", AdminRouter);

app.listen(port, () => {
  console.log(`Server Listen on Port ${port}`);
});

app.post("/login", async (req, res) => {
  const userData = req.body;
  const token = await dbVerify(userData);
  if (token) {
    res.cookie("token", token, {
      httpOnly: true, // Prevents access from JavaScript (for security)
    });
    res.status(200).send("cookie send successful");
    return;
  }
  res.status(401).send("user authentication failed");
});
// routes
app.get("/", (req, res) => {
  res.send("root here");
});

app.get("*", (req, res) => {
  res.send("you have made req to wrong route");
});
