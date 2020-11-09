import config from '../config'
import User from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signin = async (req, res) => {
  const { email = null, password = null } = req.body
  const invalid = 'Incorrect email or password'

  if (!email || !password) {
    return res.status(400).json({ message: 'Need email and password' })
  }

  try {
    var user = await User.findOne({ email }).select('email password').exec()

    if (!user) {
      return res.status(401).json(invalid)
    }

    const match = await user.checkPassword(password)
    if (!match) {
      return res.status(401).json(invalid)
    }

    const token = await newToken(user)

    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const signup = async (req, res) => {
  const { email = null, password = null } = req.body
  if (!email || !password) {
    return res.status(400).end({ message: 'Need email and password' })
  }

  try {
    var user = await User.create({
      email,
      password,
      cart: { items: [] },
      orders: [],
    })
    const token = await newToken(user)
    res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = String(req.headers.authorization)

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()

  var payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  try {
    var user = await User.findById(payload.id).select('-password').exec()
  } catch (e) {
    console.error(e)
    res.status(401).end()
  }

  req.user = user
  next()
}
