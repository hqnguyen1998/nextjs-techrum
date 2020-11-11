import nextConnect from 'next-connect';
import Category from '../../../models/Category';
import middleware from '../../../middlewares/middleware';
import authJWT from '../../../middlewares/authJWT';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

// @URL      /api/category
// @Method   GET
// @Desc     Get all categories with sub categories
handler.get(async (req, res) => {
  const query = req.query;

  try {
    const categories = await Category.find({})
      .populate({
        path: 'subCategory',
        populate: {
          path: 'posts',
          populate: {
            path: 'author',
            select: '-password',
          },
        },
      })
      .sort({
        created_date: query.sort,
      })
      .limit(Number(query.limit));

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
});

// @URL      /api/category
// @Method   POST
// @Desc     Create new category with user account admin type
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
