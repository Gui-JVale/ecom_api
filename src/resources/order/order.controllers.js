import { crudControllers } from '../../utils/crud'
import Order from './order.model'

export default {
  ...crudControllers({ model: Order, checkOwnership: true }),
}
