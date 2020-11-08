import Product from './product.model'
import { crudControllers } from '../../utils/crud'

export default {
  ...crudControllers({ model: Product, checkOwnership: false }),
}
