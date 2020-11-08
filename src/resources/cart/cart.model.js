import { model, Schema } from 'mongoose'

var cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        defualt: 0,
      },
    },
  ],
})

cartSchema.virtual('subtotal').get(function () {
  return this.products.reduce(getSubtotal, 0)
})

export default cartSchema

//*========================
function getSubtotal(subtotal, product) {
  return (subtotal += product.price * product.quantity)
}
