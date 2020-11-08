import express from 'express'
import controllers from './product.controllers'
import { protect } from '../../utils/auth'

var router = express.Router()

// /products
router.route('/').get(controllers.getMany).post(protect, controllers.createOne)

// /products/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(protect, controllers.updateOne)
  .delete(protect, controllers.removeOne)

export default router
