import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    imageUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    sizes: {
      type: [String],
      required: true
    },
    colors: {
      type: [String],
      required: true
    },
    customizationOptions: {
      text: {
        type: String,
        default: false
      },
      design: {
        type: String,
        required: true
      }
    }
  });
const Product = mongoose.model('products', productSchema);
export default Product;