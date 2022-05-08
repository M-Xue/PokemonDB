import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    pokemon: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemon',
        required: false
    }],
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model('trainer', trainerSchema, 'trainers');