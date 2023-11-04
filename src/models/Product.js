const { Schema, default: mongoose } = require('mongoose');
const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [2, 'min is 2'],
        max: [2000, 'max is 2000']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
        min: [1, 'min is 1'],
        max: [100, 'max is 100']
    },
    des: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: (props) => `${props.value} allow type: jpq, jpeg, png`
        },
        required: [true, 'Image is required']
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
