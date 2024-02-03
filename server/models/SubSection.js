
const mongoose = require("mongoose");

const subSectionSchemama = new mongoose.Schema({

    title:{
        type:String,
        reequired:true,
    },
    timeDuration:{
        type:String,
        reequired:true,
    },
    description:{
        type:String,
        reequired:true,
    },
    videoUrl:{
        type:String,
        reequired:true,
    },
})

module.exports = mongoose.model("SubSection",subSectionSchemama);