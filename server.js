import express from 'express' ;
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import dbConnection from './config/db.js';
import authRoute from './route/authRoute.js';
import cors from 'cors';
import productRoute from './route/productRoute.js';
import designRoute from './route/designRoute.js';
import orderRoute from './route/orderRoute.js';
import walletRoute from './route/walletRoute.js';
import paymentRoute from './route/paymentRoute.js';
dotenv.config();
const app = express();
//mongodb+srv://prathamjha00786:Pratham1234@meradatabase.10fgbhc.mongodb.net/?retryWrites=true&w=majority&appName=meraDatabase
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
dbConnection();
app.use('/auth' , authRoute);
app.use('/product' , productRoute);
app.use('/design' , designRoute);
app.use('/orders' , orderRoute);
app.use('/wallet' , walletRoute);
app.use('/submitPaymentForm' , paymentRoute);
app.get('/' , (req , res) => {
    res.send("Hey");
});
const PORT = process.env.PORT||5000;
app.listen(PORT , () => console.log(`Server is running on Port ${PORT}`.bgCyan
.white));