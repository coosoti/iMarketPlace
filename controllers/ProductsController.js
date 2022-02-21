import CryptoJS from 'crypto-js';
import Product from '../models/Product';

const CryptoSecKey = 'kulundeng5victorbenosa';

class ProductsController {
  // CREATE PRODUCT

  static async createProduct(req, res) {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct).end();
    } catch(err) {
      res.status(500).json(err).end();
    }
  }

  /*
    static async verifyAuthToken(req, res) {
    if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
    req.body.password,
    CryptoSecKey,
    ).toString();
    }

    try {
    const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
    $set: req.body,
    },
    { new: true },
    );
    res.status(200).json(updatedUser).end();
    } catch (err) {
    res.status(500).json(err).end();
    }
    }

    // Delete User
    static async delUser(req, res) {
    try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...').end();
    } catch (err) {
    res.status(500).json(err).end();
    }
    }

    // Get User
    static async getUser(req, res) {
    try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others).end();
    } catch (err) {
    res.status(500).json(err).end();
    }
    }

    // Get All Users
    static async getAllUsers(req, res) {
    const query = req.query.new;
    try {
    const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
    res.status(200).json(users).end();
    } catch (err) {
    res.status(500).json(err).end();
    }
    }

    // Get User Stats
    static async getUserStats(req, res) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
    const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
    $project: {
    month: { $month: "$createdAt" },
    },
    },
    {
    $group: {
    _id: "$month",
    total: { $sum: 1},
    },
    },
    ]);
    res.status(200).json(data).end();
    } catch(err) {
    res.status(500).json(err).end();
    }
    } */
}
module.exports = ProductsController;
