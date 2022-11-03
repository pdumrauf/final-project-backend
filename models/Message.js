const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        type: { type: String, enum: ["user", "system"], required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

module.exports = { Message, messageSchema };