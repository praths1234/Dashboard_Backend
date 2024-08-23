import mongoose from 'mongoose';

const paymentFormSchema =  new mongoose.Schema({
    userEmail: {
        type: String,
        ref: 'User',
        required: true
      },
      paymentReference: {
        type: String,
        required: true
      },
      statusUpdate :{
        type:String, 
        default: "Pending"
    }
});
const PaymentForm = mongoose.model('paymentforms', paymentFormSchema);
export default PaymentForm;