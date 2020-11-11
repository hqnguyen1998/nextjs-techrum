import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import authJWT from '../../../middlewares/authJWT';

// Models
import Post from '../../../models/Post';
import SubCategory from '../../../models/SubCategory';
import User from '../../../models/User';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

// @URL      /api/post
// @Method   GET
// @Desc     Search post by query
handler.get(async (req, res) => {
  const { q } = req.query;
  try {
    const posts = await Post.find({
      title: {
        $regex: q,
        $options: 'ig',
      },
    });

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

// @URL      /api/post
// @Method   Post
// @Desc     Create new post by user
handler.post(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      msg: 'Please login before create a post',
    });
  }

  try {
    const postData = {
      ...req.body,
      author: user._id,
    };

    const post = await Post.create(postData);

    await User.findByIdAndUpdate(user._id, {
      $push: {
        posts: post._id,
      },
    });

    await SubCategory.findByIdAndUpdate(req.body.category, {
      $push: {
        posts: post._id,
      },
    });

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
