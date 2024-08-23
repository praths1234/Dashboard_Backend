import PaymentForm from "../model/PaymentForm.js";
import mongoose from "mongoose";
import userModel from "../model/userModel.js";
import Product from "../model/Product.js";
export const submitPaymentForm = async (req , res) => {
    const formData = req.body;

    try {
        // Create a new payment document
        const newPayment = new PaymentForm({
            userEmail: formData.userEmail,
            paymentReference: formData.paymentReference
        });

        // Save to database
        let result= await newPayment.save();
        console.log('Form data saved to database:', newPayment);

        res.status(201).send({
            success: true,
            message : "Form data received successfully"});
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send({ 
            success: false,
            message: 'Failed to save form data. Please try again later.' });
    }
};
export const getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentForm.find();
        res.status(200).send(payments);
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({ message: 'Failed to retrieve payment details. Please try again later.' });
    }
};
export const updateWalletBalance = async (req, res) => {
    const { email, amount, paymentId } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.walletBalance = (user.walletBalance || 0) + amount;
        await user.save();

        const payment = await PaymentForm.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment details not found' });
        }

        payment.statusUpdate = 'Updated';
        await payment.save();

        res.status(200).json({ message: 'Wallet balance and payment status updated successfully' });
    } catch (error) {
        console.error('Error updating wallet balance and payment status:', error);
        res.status(500).json({ message: 'Failed to update wallet balance and payment status. Please try again later.' });
    }
};