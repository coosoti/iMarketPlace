import { Router } from 'express';
import User from '../models/User';

const CryptoJS = require('crypto-js');

class AuthController {
  // User Registration
  static async register(req, res) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, 'abcdefgjh').toString(),
    });

    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // User Login
  static async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        res.status(401).json('Invalid credentials!');
      }

      const hashedPwd = CryptoJS.AES.decrypt(user.password, 'abcdefgjh');

      const password = hashedPwd.toString(CryptoJS.enc.Utf8);

      if (password !== req.body.password) {
        res.status(401).json('Invalid Credentials!');
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = AuthController;
