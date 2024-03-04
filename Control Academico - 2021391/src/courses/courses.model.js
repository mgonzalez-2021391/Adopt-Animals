import {Schema, model} from "mongoose"

const courseSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    versionKey: false
})

export default model('course', courseSchema)