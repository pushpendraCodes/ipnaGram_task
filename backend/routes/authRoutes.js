const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { createUserValidator, handleValidationErrors } = require("../validation/userValidation");

router.post(
  "/signup",
  createUserValidator,
  handleValidationErrors,
  authController.CreateUser
);
router.post("/login", authController.loginUser);

module.exports = router;
