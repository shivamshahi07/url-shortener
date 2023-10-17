const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restricto } = require("../middlewares/auth");

router.get("/admin/urls", restricto(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
  });
});
router.get("/", restricto(["NORMAL","ADMIN"]), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
module.exports = router;
