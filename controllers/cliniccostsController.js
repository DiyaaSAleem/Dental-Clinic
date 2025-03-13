const Cliniccosts = require("../models/cliniccostsModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getcliniccosts = handlerFactory.getOne(Cliniccosts);
exports.createcliniccosts = handlerFactory.createOne(Cliniccosts);
exports.updatecliniccosts = handlerFactory.updateOne(Cliniccosts);
exports.deletecliniccosts = handlerFactory.deleteOne(Cliniccosts);
exports.getAllcliniccosts = handlerFactory.getAll(Cliniccosts);
exports.defult = catchAsync(async (req, res, next) => {
  //write your code here
  const doc = []
  if(!doc){
    return (new AppError("Message Error",400))
    }
  res.status(200).json({
    status: "success",
    doc,
  });
});
