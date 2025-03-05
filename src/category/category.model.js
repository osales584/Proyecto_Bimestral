import { Schema, model, version } from "mongoose";

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLenght: [30, "Name cannot exceed 30 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLenght: [80, "Name cannot exceed 80"]
    },
    status:{
        type: Boolean,
        default: true
    } 
},
{
    versionKey: false,
    timeStamps: true
});

export default model(`Category`, categorySchema)