
import express from 'express';
import { placeOrder,userOrders,allOrders,updateStatus,placeOrderRazorpay,placeOrderStripe,verifyStripe } from '../controllers/ordersController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

//Admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',placeOrderRazorpay);

//Verify Payment

orderRouter.post('/verifyStripe',authUser,verifyStripe);

//User Faetures

orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter;