import express from 'express'
import { json, urlencoded } from 'body-parser'

import { connect } from './utils/db'
import config from './config'

export const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send({ message: 'ok' })
})

// CONNECT DB AND START app
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
