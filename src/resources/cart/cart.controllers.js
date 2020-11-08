export default {
  getCart,
  addToCart,
  change,
  removeFromCart,
  clearCart,
}

function getCart(req, res) {
  var { cart } = req.user
  return res.status(200).send(cart)
}

async function addToCart(req, res) {
  var { productId = null } = req.body
  var {
    user: { cart },
  } = req
  var updatedCartItems = [...cart.items]
  var cartProductIndex

  if (!productId) {
    return res.status(400).json({ message: 'Need product ID' })
  }

  cartProductIndex = updatedCartItems.findIndex(matchId)

  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity += 1
  } else {
    updatedCartItems.push({
      productId,
      quantity,
    })
  }

  cart.items = updatedCartItems

  try {
    await req.user.save()
    return res.status(201).send(cart)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }

  //*==================
  function matchId(i) {
    return String(i.productId) === String(productId)
  }
}

async function change(req, res) {
  var { productId = null, quantity = null } = req.body
  var {
    user: { cart },
  } = req
  var updatedCartItems = [...cart.items]
  var cartProductIndex

  if (!productId || !quantity || quantity < 0) {
    return res
      .status(400)
      .json({ message: 'Need product ID and quantity greater than 0' })
  }

  cartProductIndex = updatedCartItems.findIndex(matchId)

  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity = quantity
  } else {
    updatedCartItems.push({
      productId,
      quantity,
    })
  }

  cart.items = updatedCartItems

  try {
    await req.user.save()
    return res.status(201).send(cart)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }

  //*==================
  function matchId(i) {
    return String(i.productId) === String(productId)
  }
}

async function removeFromCart(req, res) {
  var { productId = null } = req.body
  var {
    user: { cart },
  } = req
  var updatedCartItems

  if (!productId) return res.status(400).json({ message: 'Need product ID' })

  updatedCartItems = cart.items.filter(byId)

  cart.items = updatedCartItems

  try {
    await req.user.save()
    return res.status(201).send(cart)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }

  //*==================
  function byId(i) {
    return String(i.productId) === String(productId)
  }
}

async function clearCart(req, res) {
  var {
    user: { cart },
  } = req
  cart.items = []

  try {
    await req.user.save()
    return res.status(201).send(cart)
  } catch (e) {
    console.error(e)
    res.status(401).end()
  }
}
