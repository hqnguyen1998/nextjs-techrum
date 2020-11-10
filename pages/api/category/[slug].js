import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';

// Models
import Category from '../../../models/Category';

const handler = nextConnect();

handler.use(middleware);

// @URL      /api/category/:slug
// @Method   GET
// @Desc     Get single category by id
handler.get(async (req, res) => {
  const { slug } = req.query;
  try {
    const category = await Category.findById(slug).populate({
      path: 'subCategory',
    });

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
