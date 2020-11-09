import express from 'express'
import controllers from './order.controllers'

var router = express.Router()

// /orders
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /orders/:id
router.route('/:id').get(controllers.getOne)

export default router
