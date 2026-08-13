import express from 'express'
import { productController } from '../controllers/product.controller'

const productRouter = express.Router()

productRouter.get('/', productController.getAll)
productRouter.get('/:productId', productController.getById)
productRouter.post('/', productController.create)
productRouter.put('/:productId', productController.update)
productRouter.delete('/:productId', productController.delete)

export default productRouter
