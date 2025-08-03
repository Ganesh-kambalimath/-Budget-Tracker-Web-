import User from '../models/User.js';
import authConfig from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8); 

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User was registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message |
      | 'Error registering user.' });
}
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password); 
    if (!passwordIsValid) {
      return res.status(401).json({ accessToken: null, message: 'Invalid Password!' });
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      algorithm: 'HS256',
      expiresIn: authConfig.jwtExpiration,
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message |
| 'Error signing in.' });
}
};
