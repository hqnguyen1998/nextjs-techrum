import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';
import User from '../../../../models/User';

const handler = nextConnect();

handler.use(middleware);

// @URL      /api/user/:slug
// @Method   GET
// @Desc     Get single user profile
handler.get(async (req, res) => {
  const { slug } = req.query;
  try {
    const user = await User.findById(slug)
      .select('-password')
      .populate({
        path: 'posts',
      })
      .populate({
        path: 'comments',
      });

    if (!user)
      return res.status(404).json({
        success: false,
        msg: 'Không tìm thấy thông tin thành viên',
      });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Lỗi',
    });
  }
});

export default handler;
