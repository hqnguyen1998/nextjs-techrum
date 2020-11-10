import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';

// Models
import SubCategory from '../../../models/SubCategory';

const handler = nextConnect();

handler.use(middleware);

// @URL      /api/subcategory/:slug
// @Method   GET
// @Desc     Get single sub category by slug
handler.get(async (req, res) => {
  const { slug } = req.query;
  try {
    const subCategory = await SubCategory.findOne({ slug: slug })
      .populate({
        path: 'category',
        select: '-subCategory',
      })
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
          select: '-posts -password',
        },
      });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        msg: 'SubCategory not found',
      });
    }

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
