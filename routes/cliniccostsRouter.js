const cliniccostsController = require("../controllers/cliniccostsController");
const authMiddlewers=require("../middlewares/authMiddlewers");
  const express = require("express");
  const router = express.Router();
  router
  .route("/")
  .get(authMiddlewers.protect,
    authMiddlewers.restrictTo("doctor")
    ,cliniccostsController.getAllcliniccosts)
    .post(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,cliniccostsController.createcliniccosts);
  router
    .route("/:id")
    .get(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,cliniccostsController.getcliniccosts)
    .patch(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,cliniccostsController.updatecliniccosts)
    .delete(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,cliniccostsController.deletecliniccosts);
  module.exports = router;
  