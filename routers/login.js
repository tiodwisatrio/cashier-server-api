const express = require("express");
const { Login } = require("../controllers/login");

const router = express.Router();

// Gunakan authRoutes sebagai middleware untuk rute autentikasi
router.use("/login", Login);

module.exports = router;
