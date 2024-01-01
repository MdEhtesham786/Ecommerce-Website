const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],

    },
    price: {
        type: Number,
        required: [true, 'Please Enter Product Price']
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description']
    },
    moreInfo: {
        type: Object
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            name: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                required: true
            }
            , mimetype: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please Enter Product Category']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        maxLength: [4, 'Stock cannot exceed 4 characters'],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ], productOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { strict: false });
module.exports = mongoose.model('product', productSchema);