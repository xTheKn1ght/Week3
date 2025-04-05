import jwt from 'jsonwebtoken';
import 'dotenv/config';
import process from 'process';

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('token', token);

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    res.status(403).json({ message: 'Invalid token' }); // Forbidden
  }
};

export { authenticateToken };
