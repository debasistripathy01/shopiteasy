// const { Schema, model, default: mongoose } = require("mongoose");
const mongoose = require("mongoose")
const otpSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },

    createdAt: { type: Date, default: Date.now, index: { expires: 300 } }

    // After 5 minutes it will be deleted from the database
}, { timestamps: true, versionKey: false })

const SchemaOtp=mongoose.model("Otp", otpSchema);

module.exports={SchemaOtp}