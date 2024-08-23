import userModel from "../model/userModel.js";
import mongoose from "mongoose";
export const walletAmount = async (req, res) => {
    try {
        const { userId } = req.params;

        // Log the received userId
        console.log("Received userId:", userId);

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Find user by ID
        const user = await userModel.findById(userId);

        // Log the retrieved user
        console.log("Retrieved user:", user);

        if (user) {
            res.send(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const updateWalletAmount = async (req , res) => {
    try{
        const {userId} = req.params;
        const {balance} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        user.walletBalance=balance;
        await user.save();
        res.status(200).json({ message: 'Wallet balance updated successfully' });
    } catch(error){
        console.error('Error updating wallet balance:', error);
        res.status(500).json({ message: 'Failed to update wallet balance' });
    }
};
