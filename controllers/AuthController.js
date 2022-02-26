import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const CryptoJS = require('crypto-js');

const CryptoSecKey = 'kulundeng5victorbenosa';
class AuthController {
  // User Registration
  static async register(req, res) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, CryptoSecKey).toString(),
    });

    if (!req.body.username) {
      return res.status(400).json('Missing username').end();
    }
    if (!req.body.email) {
      return res.status(400).json('Missing email').end();
    }
    if (!req.body.password) {
      return res.status(400).json('Missing password').end();
    }

    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).json('That user already exists').end();
      }
      const userR = await newUser.save();
      return res.status(201).json(userR).end();
    } catch (err) {
      res.status(400).json(err).end();
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
        { expiresIn: '1d' },
      );

      const { password, ...others } = user._doc;

      res.status(200).json({ ...others, accessToken }).end();
    } catch (err) {
      res.status(500).json(err).end();
    }
  }
}

module.exports = AuthController;
