const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 10, maxlength: 50 },
        description: { type: String, required: true, minlength: 10, maxlength: 250 },
        image: { type: String, required: true },
        price: { type: Number, required: true, min:0, max:1000000 },
        count: { type: Number, required: true, min:0, max:1000000 },
    },
    {timestamps: false,
    collection:'Products'
    }
);

module.exports = mongoose.model('Product', productSchema);

