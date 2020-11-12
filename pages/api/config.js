import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import authJWT from '../../middlewares/authJWT';
import Config from '../../models/Config';

const handler = nextConnect();

handler.use(middleware).use(authJWT);

// @URL      /api/config
// @Method   GET
// @Desc     Get Config page
handler.get(async (req, res) => {
  try {
    const config = await Config.find({});

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Lỗi',
    });
  }
});

// @URL      /api/config
// @Method   POST
// @Desc     Create Config Page
handler.post(async (req, res) => {
  if (!req.user || req.user.accountType !== 'admin') {
    return res.status(401).json({
      success: false,
      msg: 'Non-Authorization',
    });
  }

  try {
    const existedConfig = await Config.find({});

    if (existedConfig.length > 0) {
      return res.status(400).json({
        success: false,
        msg: 'Đã có dữ liệu, không thể tạo thêm',
      });
    }

    const config = await Config.create({ ...req.body });

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Lỗi',
    });
  }
});

export default handler;
