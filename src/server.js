import express from 'express'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'

import { connect } from './utils/db'
import { signin, signup, protect } from './utils/auth'
import config from './config'

import productsRouter from './resources/product/product.router'
import collectionRouter from './resources/collection/collection.router'
import userRouter from './resources/user/user.router'
import orderRouter from './resources/order/order.router'
import cartRouter from './resources/cart/cart.router'

export const app = express()

//======== Config ============
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

//======== Routes ============
app.post('/signin', signin)
app.post('/signup', signup)

// Partially or non-auth routes
app.use('/products', productsRouter)
app.use('/collection', collectionRouter)

// Auth routes
app.use(protect)
app.use('/user', userRouter)
app.use('/orders', orderRouter)
app.use('/cart', cartRouter)
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
