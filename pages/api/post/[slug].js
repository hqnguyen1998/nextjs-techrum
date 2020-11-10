import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import Post from '../../../models/Post';

const handler = nextConnect();

handler.use(middleware);

// @URL      /api/post/:slug
// @Method   GET
// @Desc     fetch post by slug
handler.get(async (req, res) => {
  const { slug, limit, sort, page } = req.query;

  try {
    const posts = await Post.find({ category: slug })
      .populate({
        path: 'author',
        select: '-password',
      })
      .sort({
        posted_date: sort,
      })
      .limit(parseInt(limit))
      .skip(parseInt(page));

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

export default handler;
