import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const CryptoJS = require('crypto-js');
const CryptoSecKey = "kulundeng5victorbenosa";
class AuthController {
  // User Registration
  static async register(req, res) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, CryptoSecKey).toString(),
    });

    try {
      const user = await newUser.save();
      res.status(201).json(user).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }

  // User Login
  static async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        res.status(401).json('Invalid credentials - not user!').end();
      }

      const hashedPwd = CryptoJS.AES.decrypt(user.password, CryptoSecKey);

      const initPassword = hashedPwd.toString(CryptoJS.enc.Utf8);

      if (initPassword !== req.body.password) {
        res.status(401).json('Invalid credentials!').end();
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        'secretkey',
        { expiresIn: '1d' }
      );

      const { password, ...others } = user._doc;

      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err).end();
    }
  }
}

module.exports = AuthController;
