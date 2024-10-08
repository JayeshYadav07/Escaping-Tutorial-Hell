const express = require("express");
const router = express.Router();
const db = require("../db");
const { userLogin, userSignup } = require("../controllers/users.controller");

router.post("/login", userLogin);

router.post("/signup", userSignup);

module.exports = router;
