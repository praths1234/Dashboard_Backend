import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design',
    required: false,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  shippingAddress: {
    type: String,
    required: true,
  }
});

const Order = mongoose.model('orders', orderSchema);

export default Order;
