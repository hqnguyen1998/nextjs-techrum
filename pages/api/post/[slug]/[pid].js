import nextConnect from 'next-connect';
import Post from '../../../../models/Post';
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

// @URL      /api/post/:slug/:pid
// @Method   GET
// @Desc     fetch post by slug and id
handler.get(async (req, res) => {
  const { slug, pid } = req.query;
  try {
    const post = await Post.findOne({ _id: pid, slug: slug })
      .populate({
        path: 'author',
        select: '-password',
      })
      .populate({
        path: 'category',
        populate: 'category',
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

export default handler;
