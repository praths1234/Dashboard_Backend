import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#FFFFFF'
  },
  size: {
    type: String,
    default: 'XS'
  },
  image: {
    type: String,
    default: null
  },
  textPosition: {
    type: Object,
    default: { x: 0, y: 0, width: 200, height: 100 }
  },
  imagePosition: {
    type: Object,
    default: { x: 0, y: 0, width: 200, height: 200 }
  },
  customizedImage: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Design = mongoose.model('designs', designSchema);

export default Design;
