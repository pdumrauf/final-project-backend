const mongoose = require("mongoose");
const { productSchema } = require("./Product");

const prodWithQtySchema = new mongoose.Schema({
    ...productSchema.obj,
    quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
    {
        products: [prodWithQtySchema],
        orderNumber: { type: Number, required: true },
        state: { type: String, default: "generated" },
        userEmail: { type: String, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = { Order, orderSchema };