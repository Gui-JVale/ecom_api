import User from './user.model'

function me(req, res) {
  if (!req.user) {
    res.status(400).end()
  }
  return res.status(200).json({ data: req.user })
}

async function updateMe(req, res) {
  if (!req.user) {
    res.status(400).end()
  }
  try {
    var user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec()
    return res.status(201).json({ data: user })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default {
  me,
  updateMe,
}
