import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

export default async function checkUser(req, res, next) {
  const token = req.headers['authorization'];
  let tokenData;

  if (!token) {
    return res
      .status(403)
      .json({ message: 'No token.' });
  }

  try {
    tokenData = jwt.verify(token, config.secret);
  } catch({ message }) {
    return res
      .status(400)
      .json({ message });
  }

  const { _id } = tokenData;
  const user = await User.findOne({ _id });

  if (!user) {
    return res.json({ message: 'User not found' });
  }

  next();
}
