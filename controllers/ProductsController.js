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

  // Update Product
  static async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.status(200).json(updatedProduct).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Delete Product
  static async delProduct(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json('Product has been deleted...').end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Get Product
  static async getProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // Get All Products
  static async getAllProducts(req, res) {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;

      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(10);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
      res.status(200).json(products).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }
}

module.exports = ProductsController;
