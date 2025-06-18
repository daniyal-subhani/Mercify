import mongoose from 'mongoose';


const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    }, 
    subCategory: [{
        type: String,
        required: true,
        trim: true
    }]
})

const Category = mongoose.model('Category', categorySchema);
export default Category;