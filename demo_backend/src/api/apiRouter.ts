import express from 'express'
import categoryRouter from './routers/category.router'
import productRouter from './routers/product.router'

const apiRouter = express.Router()

apiRouter.use('/categories', categoryRouter)
apiRouter.use('/products', productRouter)

export default apiRouter
