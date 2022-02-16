import { Router } from 'express';
import User from '../models/User';
const router = Router();
const CryptoJS = require("crypto-js");

class AuthController {
  // User Registeration
  static async register(req, res) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, "abcdefgjh").toString(),
    });

    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = AuthController;
