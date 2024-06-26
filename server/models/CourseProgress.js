
const mongoose = require("mongoose");

const courseProgressSchema= new mongoose.Schema({

    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    completeVideo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }]
});

module.exports= mongoose.model("CourseProgress",courseProgressSchema);