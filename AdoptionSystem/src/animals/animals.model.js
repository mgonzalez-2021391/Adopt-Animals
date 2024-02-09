import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        maxLenght: 2,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    keeper: {
        type: String,
        enum: ['Manuel González'],
        required: true
    }
})