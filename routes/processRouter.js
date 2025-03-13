const processController = require("../controllers/processController");
const authMiddlewers=require("../middlewares/authMiddlewers");
  const express = require("express");
  const router = express.Router();
  router
  .route("/")
  .get(authMiddlewers.protect,
    authMiddlewers.restrictTo("doctor")
    ,processController.getAllprocess
  )
    .post(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,processController.createprocess
    );
    router
    .route("/new")
      .post(authMiddlewers.protect,
        authMiddlewers.restrictTo("doctor")
        ,processController.newpro
      );
    
  router
    .route("/:id")
    .get(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,processController.getprocess
    )
    // .patch(authMiddlewers.protect,
    //   authMiddlewers.restrictTo("doctor")
    //   ,processController.updateprocess
    // )
    .patch(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,processController.updateanyprocess
    )
    .delete(authMiddlewers.protect,
      authMiddlewers.restrictTo("doctor")
      ,processController.deleteprocess
    );
  module.exports = router;
  