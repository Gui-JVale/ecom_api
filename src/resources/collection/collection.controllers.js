import { crudControllers } from '../../utils/crud'
import Collection from './collection.model'

export default {
  ...crudControllers({ model: Collection, checkOwnership: false }),
  getOne,
  getMany,
  addProduct,
  removeProduct,
}

// *================================

async function getOne(req, res) {
  try {
    const doc = await Collection.findOne({ _id: req.params.id })
      .populate('products')
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

async function getMany(req, res) {
  try {
    const docs = await Collection.find().populate('products').lean().exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

async function addProduct(req, res) {
  var { collectionId = null, productId = null } = req.body

  if (!collectionId || !productId) {
    return res
      .status(400)
      .json({ message: 'Need collection ID and product ID' })
  }

  try {
    var collection = await Collection.findById(collectionId).exec()

    if (!collection) {
      return res.status(400).json({ message: 'Collection not found' })
    }

    const productInCollection = collection.products.find(matchId)
    if (productInCollection) {
      return res.status(400).json({ message: 'Product already in collection' })
    }

    collection.products.push(productId)
    await collection.save()
    return res.status(201).json({ data: collection })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
  //*=========================================
  function matchId(id) {
    return String(productId) == String(id)
  }
}

async function removeProduct(req, res) {
  var { collectionId = null, productId = null } = req.body
  var updatedProducts

  if (!collectionId || !productId) {
    return res
      .status(400)
      .json({ message: 'Need collection ID and product ID' })
  }

  try {
    var collection = await Collection.findById(collectionId).exec()

    if (!collection) {
      return res.status(400).json({ message: 'Collection not found' })
    }

    updatedProducts = [...collection.products]

    const productInCollection = collection.products.find(matchId)
    if (!productInCollection) {
      return res
        .status(400)
        .json({ message: 'Product not found in collection' })
    }

    updatedProducts = updatedProducts.filter(byId)

    collection.products = updatedProducts
    await collection.save()
    return res.status(201).json({ data: collection })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }

  //*=========================================
  function matchId(id) {
    return String(productId) == String(id)
  }
  function byId(id) {
    return String(productId) != String(id)
  }
}
