import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [200, "Description cannot exceed 200 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"]
    },
    salesCount: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.ObjectId,
        ref: "Category",
        required: true
    },
    status: {
        type: String,
        default: true
    }
}, 
{
    versionKey: false,
    timestamps: true
});

export default model("Product", productSchema);
