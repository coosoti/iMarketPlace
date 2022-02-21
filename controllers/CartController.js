import CryptoJS from 'crypto-js';
import Cart from '../models/Cart';

const CryptoSecKey = 'kulundeng5victorbenosa';

class CartController {

  // Create Cart
  static async createCart(req, res) {
    const newCart = new Cart(req.body);
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart).end();
    } catch(err) {
      res.status(500).json(err).end();
    }
  }

  // Update Cart
  static async updateCart(req, res) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.status(200).json(updatedCart).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Delete Product
  static async delCart(req, res) {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json('Cart has been deleted...').end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Get User Cart
  static async getUserCart(req, res) {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Get All Carts (By Admin User)

  static async getAllCarts(req, res) {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts).end();
    } catch(err) {
      res.status(500).json(err).end();
    }
  }
}

module.exports = CartController;
