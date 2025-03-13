const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
    patient: {
        required: [true, 'must enter patient'],
        type: mongoose.Schema.ObjectId,
        ref: 'Patient'
    },
    service: {
        required: [true, 'must enter service'],
        type: mongoose.Schema.ObjectId,
        ref: 'Service'
    },
    tooth: {
        type: String,
        default: "ناب ايسر"
    },
    paid: {
        required: [true, 'must enter paid'],
        type: Number,
    },
    note: {
        required: [true, 'must enter notes'],
        type: String,
    },
    numberprocess: {
        required: [true, 'must enter the number of processes'],
        type: Number,
    },
    date: {
        required: [true, 'must enter date'],
        type: Date,
    },
    process: { // الحقل الجديد للجلسة السابقة
        type: mongoose.Schema.ObjectId,
        ref: 'Process' // يشير إلى نموذج الجلسة
    },
    remaining_amount:{
        type:Number,
    },
    complete:{
        type:Number,
    },
    totalincreas:{
        type:Number,
    },
}, {
    timestamps: true
});

const Process = mongoose.model("Process", processSchema);
module.exports = Process;
