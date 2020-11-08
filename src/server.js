import express from 'express'
import { json, urlencoded } from 'body-parser'

import { connect } from './utils/db'
import config from './config'

import productsRouter from './resources/product/product.router'
import userRouter from './resources/user/user.router'
import { signin, signup, protect } from './utils/auth'

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
app.use('/user', protect)
app.use('/user', userRouter)

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
