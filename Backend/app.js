const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("root here");
});

app.listen(port, () => {
  console.log(`Server Listen on Port ${port}`);
});
