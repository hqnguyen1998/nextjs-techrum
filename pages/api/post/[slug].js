import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import authJWT from '../../../middlewares/authJWT';
import Post from '../../../models/Post';
import User from '../../../models/User';
import SubCategory from '../../../models/SubCategory';
import Comment from '../../../models/Comment';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

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
      msg: 'Error',
    });
  }
});

// @URL      /api/post/:slug
// @Method   DELETE
// @Desc     delete post id
handler.delete(async (req, res) => {
  const { slug } = req.query;

  if (!req.user) {
    return res.status(401).json({
      success: false,
      msg: 'Non-Authorization',
    });
  }

  try {
    const checkPost = await Post.findOne({ _id: slug, author: req.user._id });

    if (!checkPost) {
      return res.status(401).json({
        success: false,
        msg: 'Lỗi! không thể xóa bài viết',
      });
    }

    const currentPost = await Post.findByIdAndRemove(slug);

    await User.findByIdAndUpdate(currentPost.author, {
      $pull: {
        posts: currentPost._id,
      },
      $pullAll: {
        comments: currentPost.comments,
      },
    });

    await SubCategory.findByIdAndUpdate(currentPost.category, {
      $pull: {
        posts: currentPost._id,
      },
    });

    await Comment.deleteMany({
      _id: {
        $in: currentPost.comments,
      },
    });

    res.status(200).json({
      success: true,
      msg: 'Xóa bài viết thành công',
      data: currentPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Error',
    });
  }
});

export default handler;
