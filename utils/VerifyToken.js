import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, user) => {
      if (err) {
        res.status(403).json('Token is not valid');
        return;
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated');
  }
};

const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not allowed to perform this action!');
    }
  });
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not allowed to perform this action!');
    }
  });
};

module.exports = { verifyToken, verifyTokenAuthorization, verifyTokenAdmin };
