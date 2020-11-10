import nextConnect from 'next-connect';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import middleware from '../../../middlewares/middleware';
import authJWT from '../../../middlewares/authJWT';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

// @URL      /api/comment
// @Method   GET
// @Desc     Get all comments @ get comments by post id
handler.get(async (req, res) => {
  const { pid } = req.query;
  try {
    if (pid) {
      const comments = await Comment.find({ post: pid }).populate({
        path: 'author',
        select: '-password',
      });

      return res.status(200).json({
        success: true,
        data: comments,
      });
    }
    const comments = await Comment.find({});

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

// @URL      /api/comment
// @Method   POST
// @Desc     Add new comment in post by user
handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      msg: 'Non-Authorization',
    });
  }

  const body = JSON.parse(req.body);

  try {
    const commentData = {
      author: req.user._id,
      post: body.pid,
      body: body.content,
    };

    const comment = await Comment.create(commentData);

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        comments: comment._id,
      },
    });

    await Post.findByIdAndUpdate(body.pid, {
      $push: {
        comments: comment._id,
      },
    });

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

export default handler;
