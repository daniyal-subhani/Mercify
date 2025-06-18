import mongoose from 'mongoose'

const sizeSchema = mongoose.Schema({
    size: {
        type: String,
        required: true,
        trim: true
    }
})

const Size = mongoose.model('Size', sizeSchema);
export default Size;