import Order from '../models/Order';

class OrderController {
  // Create Order
  static async createOrder(req, res) {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Update Order
  static async updateOrder(req, res) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.status(200).json(updatedOrder).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Delete Order
  static async delOrder(req, res) {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('Order has been deleted...').end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Get User Orders
  static async getUserOrders(req, res) {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Get All Orders

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Get Order stats - Get monthly Income

  static async getMonthlyIncome(req, res) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: prevMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ]);
      res.status(200).json(income).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }
}

module.exports = OrderController;
