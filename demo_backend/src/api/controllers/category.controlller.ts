import type { Request, Response } from 'express'
import { CategoryStatus } from '../../../generated/prisma/enums'
import { prisma } from '../prismaClient'

interface CategoryParams {
    categoryId: string
}
interface CreateCategoryRequestBody {
    name: string
    status: CategoryStatus
}
interface CategoryQuery {
    search?: string
}

export const categoryController = {
    getAll: async (
        req: Request<{}, {}, {}, CategoryQuery>,
        res: Response,
    ) => {
        const { search } = req.query
        const categories = await prisma.category.findMany({
            ...(search && {
                where: {
                    name: {
                        contains: String(search),
                    },
                },
            }),
            include: {
                products: true,
            },
        })
        res.json(categories)
    },
    getById: async (req: Request<CategoryParams>, res: Response) => {
        const id = +req.params.categoryId
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'ID không hợp lệ',
            })
        }
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                products: true,
            },
        })

        if (!category) {
            return res.status(404).json({
                message: 'Không tìm thấy danh mục',
            })
        }

        res.json(category)
    },
    create: async (
        req: Request<{}, {}, CreateCategoryRequestBody>,
        res: Response,
    ) => {
        console.log('da vao', req.body)
        const { name, status } = req.body
        if (!name) {
            return res.status(400).json({
                message: 'Tên danh mục là bắt buộc',
            })
        }
        const newCategory = await prisma.category.create({
            data: {
                name,
                status,
            },
        })

        res.status(201).json(newCategory)
    },
    update: async (
        req: Request<CategoryParams, {}, CreateCategoryRequestBody>,
        res: Response,
    ) => {
        const id = +req.params.categoryId
        const { name, status } = req.body
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID không hợp lệ' })
        }
        const isExist = await prisma.category.findUnique({
            where: { id },
        })
        if (!isExist) {
            return res.status(404).json({
                message: 'Không tìm thấy danh mục để cập nhật',
            })
        }
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                status,
            },
        })
        res.json(updatedCategory)
    },
    delete: async (req: Request<CategoryParams>, res: Response) => {
        const id = parseInt(req.params.categoryId)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID không hợp lệ' })
        }
        const isExist = await prisma.category.findUnique({
            where: { id },
        })
        if (!isExist) {
            return res.status(404).json({
                message: 'Không tìm thấy danh mục để xóa',
            })
        }

        await prisma.category.delete({
            where: { id },
        })
        res.json({
            message: 'Xóa danh mục thành công',
        })
    },
}
