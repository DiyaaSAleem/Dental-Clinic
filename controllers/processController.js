const Process = require("../models/processModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getprocess = handlerFactory.getOne(Process,
  { path: "service", select: "name cost" },
  { path: "patient", select: "_id name gender" },
  // {path:"previousProcess",select:"-_id name "}
);
exports.createprocess = handlerFactory.createOne(Process);
exports.updateprocess = handlerFactory.updateOne(Process);
exports.deleteprocess = handlerFactory.deleteOne(Process);
exports.getAllprocess = handlerFactory.getAllpop1(Process,
  { path: "service", select: "name cost -_id" },
  { path: "patient", select: "_id name gender" }
);
exports.newpro = catchAsync(async (req, res, next) => {
  const process = await Process.findById(req.body.process).populate('service');
  if (!process) return next(new AppError("Previous process not found", 400));
  const total = process.paid+req.body.paid;
  console.log(total);
  if (total > process.service.cost) {
    return next(new AppError("اكتمل دفع تكلفة الخدمة", 400));   
  }
  const newProcess = {
      patient: process.patient,
      service: process.service,
      tooth: process.tooth,
      paid: total,
      note: req.body.note,
      numberprocess: process.numberprocess + 1,
      remaining_amount:process.service.cost-total,
      date: req.body.date || new Date(),
      process: process._id // حفظ معرف الجلسة السابقة
  };
  const doc = await Process.create(newProcess);

  if (!doc) {
      return next(new AppError("Error creating new process", 400));
  }

  res.status(201).json({
      status: "success",
      doc,
  });
}

);
// exports.updateanyprocess = catchAsync(async (req, res, next) => {
//   const process = await Process.findById(req.params.id).populate('service');

//   if (!process) return next(new AppError("Previous process not found", 400)); 
//    const previus=await Process.findById(req.body.process).populate('service');
//   if (!previus) return next(new AppError("Previous process not found", 400));
//   const complete=req.body.complete;
//   const remain=process.service.cost-(process.paid+complete);
//   const preremain=previus.service.cost-(previus.paid+complete);
//   const newProcess = {
//     patient: req.body.patient,
//     service: req.body.service,
//     tooth: req.body.tooth,
//     paid: req.body.paid+complete,
//     note: req.body.note,
//     numberprocess: req.body.numberprocess,
//     remaining_amount:remain,
//     remaining_amount:preremain,
//     date: req.body.date,
//     process: process._id // حفظ معرف الجلسة السابقة
// };
// console.log(remain);
//   const doc = await Process.findByIdAndUpdate(req.params.id, newProcess, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json({
//     status: "success",
//     doc,
//   });
// }
exports.updateanyprocess = catchAsync(async (req, res, next) => {
  // العثور على الجلسة الحالية
  const process = await Process.findById(req.params.id).populate('service');
  if (!process) return next(new AppError("Previous process not found", 400));

  // العثور على الجلسة السابقة
  const previous = await Process.findById(req.body.process).populate('service');
  if (!previous) return next(new AppError("Previous process not found", 400));

  // حساب المبلغ المدفوع الجديد
  const complete = req.body.complete || 0; // تأكد من وجود قيمة
  const newPaidAmount = process.paid + complete;

  // حساب المبلغ المتبقي
  const remain = process.service.cost - newPaidAmount;
  const previousRemain = previous.service.cost - (previous.paid + complete);

  // إنشاء كائن جديد للجلسة
  const newProcess = {
    patient: req.body.patient,
    service: req.body.service,
    tooth: req.body.tooth,
    paid: newPaidAmount,
    note: req.body.note,
    numberprocess: req.body.numberprocess,
    remaining_amount: remain,
    date: req.body.date || new Date(),
    process: req.body.process // حفظ معرف الجلسة السابقة
  };

  console.log(`New Remaining Amount for Current Process: ${remain}`);
  console.log(`New Remaining Amount for Previous Process: ${previousRemain}`);

  // تحديث الجلسة الحالية
  const updatedDoc = await Process.findByIdAndUpdate(req.params.id, newProcess, {
    new: true,
    runValidators: true,
  });

  // إذا كنت تريد تحديث الجلسة السابقة أيضاً، يمكنك استخدام:
  const updatprevious=await Process.findByIdAndUpdate(req.body.process, { remaining_amount: previousRemain }, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    doc: updatedDoc,
  });}
);
