const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");

router.get("/", async (req, res) => {
  const Plans = await Plan.find({});
  res.send(Plans);
});

module.exports = router;
