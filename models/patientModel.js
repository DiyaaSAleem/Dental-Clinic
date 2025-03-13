const mongoose = require("mongoose");
const { defult } = require("../controllers/processController");
const patientSchema = new mongoose.Schema({
  name : {
      required : [true , 'must enter name'],
type : String,
    },
    gender : {
      required : [true , 'must enter gender'],
type : String,
enum: ['boy', 'girl'],
    },
    age : {
      required : [true , 'must enter age'],
type : Number,
    },
    phone: {
      type: String,
      required: [true, "You must enter a phone."],
      validate: {
        validator: (el) => {
          /(\+963\d{9}|09\d{8})/.test(el);
        },
        message: "The number is incorrect.",
      },
    },
    notes : {
    required : [true , 'must enter notes'],
type : String,
defult:"beutifull"
    },
},{
      timestamps: true
    });
    const Patient = mongoose.model("Patient", patientSchema);
    module.exports = Patient;
    