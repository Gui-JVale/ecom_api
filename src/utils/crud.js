export const getOne = ({ model, checkOwnership }) => async (req, res) => {
  var owner = checkOwnership ? getOwnership(req.user._id) : {}
  try {
    const doc = await model
      .findOne({ _id: req.params.id, ...owner })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = ({ model, checkOwnership }) => async (req, res) => {
  var owner = checkOwnership ? getOwnership(req.user._id) : {}

  try {
    const docs = await model
      .find({ ...owner })
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = ({ model, checkOwnership }) => async (req, res) => {
  var owner = checkOwnership ? getOwnership(req.user._id) : {}

  try {
    const doc = await model.create({ ...req.body, owner })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = ({ model, checkOwnership }) => async (req, res) => {
  var owner = checkOwnership ? getOwnership(req.user._id) : {}

  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          ...owner,
          _id: req.params.id,
        },
        req.body,
        { new: true, useFindAndModify: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const removeOne = ({ model, checkOwnership }) => async (req, res) => {
  var owner = checkOwnership ? getOwnership(req.user._id) : {}

  try {
    const removed = await model.findOneAndRemove({
      ...owner,
      _id: req.params.id,
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crudControllers = ({ model, checkOwnership = true }) => {
  if (typeof model != object) {
    throw new Error('First paramater must be a mongoose model')
  }
  if (typeof checkOwnership != 'boolean') {
    throw new Error('Second argument must be a boolean')
  }
  return {
    removeOne: removeOne({ model, checkOwnership }),
    updateOne: updateOne({ model, checkOwnership }),
    getMany: getMany({ model, checkOwnership }),
    getOne: getOne({ model, checkOwnership }),
    createOne: createOne({ model }),
  }
}

function getOwnership(id) {
  return { createdBy: id }
}
