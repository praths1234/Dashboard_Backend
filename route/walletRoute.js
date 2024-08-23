import express from 'express';
import { walletAmount , updateWalletAmount } from '../controller/walletController.js';
const router = express.Router() ;
router.get('/:userId' , walletAmount);
router.patch('/:userId' , updateWalletAmount);
export default router;