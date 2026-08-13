import type { Request, Response } from 'express'
import { prisma } from '../prismaClient'

export const categoryController = {
    getAll: async (req: Request, res: Response) => {
        console.log('test chạy')
        const categories = await prisma.category.findMany()
        res.json(categories)
    },
}
