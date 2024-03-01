const mongoose = require("mongoose");

const motivationSchema = new mongoose.Schema(
    {
        motiID :{
            type: Number,
            required: true,
        },
        Body: {
            type: String,
            required: true,
        },
        Author:{
            type: String,
            required: true,
        },
    },
    {
        collection: "Motivations",
    }
        
    
);
const Motivation = mongoose.model("Motivations", motivationSchema);
module.exports = Motivation;
