import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import Category from '../../../models/Category';
import SubCategory from '../../../models/SubCategory';
import authJWT from '../../../middlewares/authJWT';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

// @URL      /api/subcategory
// @Method   GET
// @Desc     Get All Subcategories
handler.get(async (req, res) => {
  try {
    const subCategories = await SubCategory.find({})
      .populate({
        path: 'posts',
      })
      .sort({
        created_date: req.query.sort,
      })
      .limit(parseInt(req.query.limit));

    res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

// @URL      /api/subcategory
// @Method   POST
// @Desc     Create sub category in category with admin user
handler.post(async (req, res) => {
  const user = req.user.accountType || undefined;

  if (user !== 'admin') {
    return res.status(401).json({
      success: false,
      msg: 'Non-Authorization',
    });
  }

  try {
    const subCategory = await SubCategory.create({ ...req.body });

    await Category.findByIdAndUpdate(req.body.category, {
      $push: {
        subCategory: subCategory._id,
      },
    });

    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

export default handler;
