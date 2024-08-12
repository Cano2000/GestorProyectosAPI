const { commentsModel } = require('../models/index')

const createComment = async (req, res) => {
  try {

    const body = req.body

    const data = await commentsModel.create(body);
    res.send({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, e});
  }
};

module.exports = {
    createComment
}