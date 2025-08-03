import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] |
    | req.headers['authorization']; //    

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    req.userId = decoded.id;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    req.user = user; 

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized! Token has expired.' });
    }
    return res.status(401).json({ message: 'Unauthorized! Invalid Token.' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.isAdmin) { 
      next();
    } else {
      res.status(403).json({ message: 'Require Admin Role!' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin, 
};

export default authJwt;
