import User from '../models/User.js';

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({ username: req.body.username });
    if (userByUsername) {
      return res.status(400).json({ message: 'Failed! Username is already in use!' });
    }
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(400).json({ message: 'Failed! Email is already in use!' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message |
      | 'Error checking duplicate username/email.' });
}
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

export default verifySignUp;
