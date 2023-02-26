import { ProductInterface } from '../../utils/interface/product.interface';
import mongoose, { Schema, Document } from 'mongoose';


const productSchema: Schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },

},
    { timestamps: true },
);

const Product = mongoose.model<ProductInterface>('Product', productSchema);

export default Product;
