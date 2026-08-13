import express from 'express'
import { categoryController } from '../controllers/category.controlller'

const categoryRouter = express.Router()

categoryRouter.get('/', categoryController.getAll)

export default categoryRouter
