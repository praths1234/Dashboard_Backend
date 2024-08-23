import express from 'express';
import { submitPaymentForm , getAllPayments , updateWalletBalance} from "../controller/paymentController.js";
const router = express.Router() ;
router.post('/' , submitPaymentForm);
router.get('/' , getAllPayments);
router.post('/update-wallet-balance' , updateWalletBalance);
export default router;