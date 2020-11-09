import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import Category from '../../../models/Category';
import authJWT from '../../../middlewares/authJWT';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

handler.get(async (req, res) => {
  res.status(200).json({
    success: true,
  });
});

// @URL      /api/category
// @Method   POST
// @Desc     Create new user with user account admin type
handler.post(async (req, res) => {
  const user = req.user.accountType || undefined;

  if (user !== 'admin') {
    return res.status(401).json({
      success: false,
      msg: 'Non-Authorization',
    });
  }

  try {
    const category = await Category.create({ ...req.body });

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

export default handler;
