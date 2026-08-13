import express from 'express'
import { categoryController } from '../controllers/category.controlller'

const categoryRouter = express.Router()

categoryRouter.get('/', categoryController.getAll)
categoryRouter.get('/:categoryId', categoryController.getById)
categoryRouter.post('/', categoryController.create)
categoryRouter.put('/:categoryId', categoryController.update)
categoryRouter.delete('/:categoryId', categoryController.delete)

export default categoryRouter
