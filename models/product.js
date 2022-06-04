const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    qtyPerUnit: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    unitInStock: {
        type: Number,
        required: true
    },
    discontinued: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }
});

module.exports = mongoose.model('Product', productSchema);