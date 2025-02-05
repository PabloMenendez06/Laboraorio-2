import { Schema, model } from "mongoose";

const petSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        uppercase: true,
        required: true,
    },
    keeper:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestap: true,
        versionKey: false
    
})

export default model('Pet', petSchema);