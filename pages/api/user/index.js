import nextConnect from 'next-connect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import middleware from '../../../middlewares/middleware';
import authJWT from '../../../middlewares/authJWT';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

// @URL      /api/user
// @Method   GET
// @Desc     Get all users information
handler.get(async (req, res) => {
  try {
    const users = await User.find({}).select('-password');

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

// @URL      /api/user
// @Method   POST
// @Desc     Register new User
handler.post(async (req, res) => {
  const { username, email, password, dob } = req.body;

  try {
    // If User is existed
    const checkUser = await User.findOne({ username: username });
    const checkEmail = await User.findOne({ email: email });

    if (checkUser !== null || checkEmail !== null) {
      return res.status(400).json({
        success: false,
        msg: 'Username or email is already existed',
      });
    }

    // Hash password
    const newPassword = await bcrypt.hash(password, 10);

    // Gravatar
    const avatar = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true);

    const newUserData = {
      username,
      email,
      dob,
      avatar,
      password: newPassword,
    };

    const user = await User.create(newUserData);

    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      msg: 'Create user successful',
      token: `Bearer ${token}`,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

// @URL      /api/user/
// @Method   PUT
// @Desc     Update user profile
handler.put(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      msg: 'Non-Authorization',
    });
  }

  try {
    // console.log(req.body);
    const newUserInfo = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .populate({
        path: 'posts',
      })
      .populate({
        path: 'comments',
      })
      .select('-password');

    res.status(200).json({
      success: true,
      msg: 'Cập nhật thông tin thành công',
      data: newUserInfo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Cập nhật thông tin không thành công',
    });
  }
});

export default handler;
