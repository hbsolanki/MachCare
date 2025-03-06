const express = require("express");
const router = express.Router();

// Import Models
const { Service } = require("../models/index");

router.get("/", async (req, res) => {
  const services = await Service.find({});
  res.send(services);
});

module.exports = router;
