import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByUsername } from '../models/user-model.js';
import 'dotenv/config';
import process from 'process';

const postLogin = async (req, res) => {
  try {
    console.log('postLogin', req.body);

    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const userWithNoPassword = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ user: userWithNoPassword, token });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({ message: 'Token OK', user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
};

export { postLogin, getMe };
