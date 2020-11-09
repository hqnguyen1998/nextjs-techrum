import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async function authJWT(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const splitToken = token.split(' ');

    if (splitToken[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        msg: 'Invalid Token',
      });
    }

    const verifiedToken = jwt.verify(splitToken[1], process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(401).json({
        success: false,
        msg: 'Invalid Token',
      });
    }

    const user = await User.findById(verifiedToken.id);

    req.user = user;
  }

  next();
}
