const patientController = require("../controllers/patientController");
const authMiddlewers=require("../middlewares/authMiddlewers");
  const express = require("express");
  const router = express.Router();
  router
  .route("/")
  .get(authMiddlewers.protect,
  authMiddlewers.restrictTo("doctor")
  ,patientController.getAllpatient)
  .post(authMiddlewers.protect,
    authMiddlewers.restrictTo("doctor"),
    patientController.createpatient);
  router
    .route("/:id")
    .get(authMiddlewers.protect,
    authMiddlewers.restrictTo("doctor")
    ,patientController.getpatient)

    .patch(authMiddlewers.protect,
    authMiddlewers.restrictTo("doctor"),
    patientController.updatepatient)

    .delete(authMiddlewers.protect,
    authMiddlewers.restrictTo("doctor")
    ,patientController.deletepatient);
  module.exports = router;
  