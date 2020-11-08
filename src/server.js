import express from 'express'
import { json, urlencoded } from 'body-parser'

import { connect } from './utils/db'
import config from './config'

import { signin, signup, protect } from './utils/auth'
import productsRouter from './resources/product/product.router'
import userRouter from './resources/user/user.router'
import cartRouter from './resources/cart/cart.router'

export const app = express()

//======== Config ============
app.use(json())
app.use(urlencoded({ extended: true }))

//======== Routes ============
app.post('/signin', signin)
app.post('/signup', signup)

// Partially or non-auth routes
app.use('/products', productsRouter)

// Auth routes
// app.use(protect)
app.use('/user', protect, userRouter)
app.use('/cart', protect, cartRouter)
//======== Start ============
// Connect DB and start app
export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () =>
      console.log(`API running on port:${config.port}`)
    )
  } catch (e) {
    console.error(e)
  }
}
