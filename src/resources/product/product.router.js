import express from 'express'
import controllers from './product.controllers'

var router = express.Router()

// /products
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /products/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
