import express from 'express'
import controllers from './collection.controllers'
import { protect } from '../../utils/auth'

var router = express.Router()

// /collection
router.route('/').get(controllers.getMany).post(protect, controllers.createOne)

// /collection/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(protect, controllers.updateOne)
  .delete(protect, controllers.removeOne)

// /collection/add
router.post('/add', controllers.addProduct)
// /collection/remove
router.post('/remove', controllers.removeProduct)

export default router
