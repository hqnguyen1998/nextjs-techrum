import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import Post from '../../../models/Post';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { slug, limit, sort, page } = req.query;

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
});

export default handler;
