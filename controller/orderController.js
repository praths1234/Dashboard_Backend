import Order from "../model/Order.js";
import userModel from "../model/userModel.js";
import Design from "../model/Design.js";
import Product from "../model/Product.js";
export const createOrder = async (req, res) => {
    try {
        const { userId, productId, designId, shippingAddress, quantity } = req.body;
        if (!shippingAddress) {
            return res.status(400).send('Shipping address is required');
        }
        if (!quantity || quantity <= 0) {
            return res.status(400).send('Quantity is required and must be greater than zero');
        }
        const newOrder = new Order({ 
            userId, productId, designId, shippingAddress, quantity , status:"Pending"});
        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (error) {
        console.error("Error placing orders:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getProductDetails = async (order) => {
    try {
        if (order.designId) {
            const design = await Design.findById(order.designId).lean();
            if (!design) {
                throw new Error('Design not found');
            }
            const product = await Product.findById(design.productId).lean();
            if (!product) {
                throw new Error('Product not found');
            }
            return { ...product, customizedImage: design.customizedImage };
        } else {
            const product = await Product.findById(order.productId).lean();
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        }
    } catch (error) {
        throw new Error(`Error fetching product details: ${error.message}`);
    }
};
export const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).lean();

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                try {
                    const productDetails = await getProductDetails(order);
                    return { ...order, productDetails };
                } catch (error) {
                    console.error(`Error fetching product details for order ${order._id}:`, error.message);
                    return { ...order, error: error.message };
                }
            })
        );

        res.send(ordersWithDetails);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = 'Cancelled';
        await order.save();
        res.status(200).json({ message: 'Your order has been cancelled', order });
    } catch (error) {
        console.error('Error cancelling order', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().lean();

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                try {
                    const productDetails = await getProductDetails(order);
                    const user = await userModel.findById(order.userId).lean();
                    return { ...order, productDetails, userEmail: user.email , OrderDate: order.orderDate};
                } catch (error) {
                    console.error(`Error fetching details for order ${order._id}:`, error.message);
                    return { ...order, error: error.message };
                }
            })
        );

        res.send(ordersWithDetails);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getOrdersByDateRange = async (req , res) => {
    try {
        const {startDate , endDate} = req.body ;
        if(!startDate || !endDate){
          return res.status(400).json({message : "Start Date and End Date is required"});
        }
        const orders = await Order.find({
            orderDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).lean();
        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                try {
                    const productDetails = await getProductDetails(order);
                    const user = await userModel.findById(order.userId).lean();
                    return { ...order, productDetails, userEmail: user.email };
                } catch (error) {
                    console.error(`Error fetching details for order ${order._id}:`, error.message);
                    return { ...order, error: error.message };
                }
            })
        );
        res.send(ordersWithDetails);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        if (!status) {
            return res.status(400).json({ message: 'Order status is required' });
        }

        const orders = await Order.find({ status }).lean();

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                try {
                    const productDetails = await getProductDetails(order);
                    const user = await userModel.findById(order.userId).lean();
                    return { ...order, productDetails, userEmail: user.email };
                } catch (error) {
                    console.error(`Error fetching details for order ${order._id}:`, error.message);
                    return { ...order, error: error.message };
                }
            })
        );

        res.send(ordersWithDetails);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
