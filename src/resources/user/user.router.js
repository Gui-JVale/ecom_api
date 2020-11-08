import express from 'express'
import controllers from './user.controllers'

var router = express.Router()

router.get('/me', controllers.me)
router.put('/updateMe', controllers.updateMe)

export default router
