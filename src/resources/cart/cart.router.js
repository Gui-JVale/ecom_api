import express from 'express'
import controllers from './cart.controllers'
var router = express.Router()

router.get('/', controllers.getCart)
router.post('/add', controllers.addToCart)
router.post('/change', controllers.change)
router.post('/remove', controllers.removeFromCart)
router.post('/clear', controllers.clearCart)

export default router
