const serviceController = require("../controllers/serviceController");
const service=require("../models/serviceModel")
const authMiddlewers=require("../middlewares/authMiddlewers");
  const express = require("express");
  const router = express.Router();
  router
  .route("/")
  .get(authMiddlewers.protect,
       authMiddlewers.restrictTo("doctor")
       ,serviceController.getAllservice)
  .post(authMiddlewers.protect,
    authMiddlewers.restrictTo("doctor")
    ,serviceController.createservice);
  router
    .route("/:id")
    .get(authMiddlewers.protect,
     authMiddlewers.restrictTo("doctor")
    ,serviceController.getservice)
    .patch(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,serviceController.updateservice)
    .delete(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,serviceController.deleteservice);
  module.exports = router;
  