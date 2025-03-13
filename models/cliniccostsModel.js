const mongoose = require("mongoose");
const cliniccostsSchema = new mongoose.Schema({
  date : {
      required : [true , 'must enter date'],
type : Date,
    },
    cost : {
      required : [true , 'must enter cost'],
type : Number,
    },
    name : {
      required : [true , 'must enter name'],
type : String,
    },
},{
      timestamps: true
    });
    const Cliniccosts = mongoose.model("Cliniccosts", cliniccostsSchema);
    module.exports = Cliniccosts;
    