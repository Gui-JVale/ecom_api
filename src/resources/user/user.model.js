import { model, Schema } from 'mongoose'
import cartSchema from '../cart/cart.model'
import bcrypt from 'bcrypt'

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: cartSchema,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
)

userSchema.pre('save', hashPassword)
userSchema.methods.checkPassword = checkPassword

export default model('User', userSchema)

//*========================
function hashPassword(next) {
  if (!this.isModified('password')) return next()

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
}

function checkPassword(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err)
      resolve(same)
    })
  })
}
