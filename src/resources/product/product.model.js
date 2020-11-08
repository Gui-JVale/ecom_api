import { model, Schema } from 'mongoose'

var productSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [String],
  tags: [String],
  price: {
    type: Number,
    required: true,
  },
  compareAtPrice: {
    type: Number,
    required: true,
  },
})

export default model('Product', productSchema)
