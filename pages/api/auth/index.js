import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import middleware from '../../../middlewares/middleware';

// Models
import User from '../../../models/User';

const handler = nextConnect();

handler.use(middleware);

// @URL      /api/auth
// @Method   GET
// @Desc     Auth user by header token
handler.get(async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({
        success: false,
        msg: 'Non-Authorization',
      });
    }

    const splitToken = authorization.split(' ');

    if (splitToken[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        msg: 'Please sign in',
      });
    }

    const verifiedToken = jwt.verify(splitToken[1], process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(401).json({
        success: false,
        msg: 'Please sign in',
      });
    }

    // Get user Information
    const user = await User.findById(verifiedToken.id);

    res.status(200).json({
      success: true,
      token: authorization,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

// @URL      /api/auth
// @Method   POST
// @Desc     Login user
handler.post(async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    // Check if user or email existed
    const emailExisted = await User.findOne({
      email: emailOrUsername,
    });

    const userNameExisted = await User.findOne({
      username: emailOrUsername,
    });

    if (!emailExisted && !userNameExisted) {
      return res.status(404).json({
        success: false,
        msg: 'Error! Please check it again.',
      });
    }

    // If has Email
    if (emailExisted) {
      // Check password
      const verifiedPassword = await bcrypt.compare(
        password,
        emailExisted.password
      );

      if (!verifiedPassword) {
        return res.status(401).json({
          success: false,
          msg: 'Error! Please check it again.',
        });
      }

      const token = jwt.sign({ id: emailExisted._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return res.status(200).json({
        success: true,
        msg: 'Login successful',
        token: `Bearer ${token}`,
        data: emailExisted,
      });
    }

    // If has username
    if (userNameExisted) {
      // Check password
      const verifiedPassword = await bcrypt.compare(
        password,
        userNameExisted.password
      );

      if (!verifiedPassword) {
        return res.status(401).json({
          success: false,
          msg: 'Error! Please check it again.',
        });
      }

      const token = jwt.sign(
        { id: userNameExisted._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );

      return res.status(200).json({
        success: true,
        msg: 'Login Sucessful',
        token: `Bearer ${token}`,
        data: userNameExisted,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

export default handler;
