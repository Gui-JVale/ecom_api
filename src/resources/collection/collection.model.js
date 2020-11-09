import { model, Schema } from 'mongoose'

var collectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})

export default model('Collection', collectionSchema)
