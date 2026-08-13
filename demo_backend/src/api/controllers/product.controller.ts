import type { Request, Response } from 'express'
import { prisma } from '../prismaClient'

interface ProductParams {
    productId: string
}
interface CreateProductRequestBody {
    name: string
    price: number
}
interface ProductQuery {
    search?: string
    page?: string
    limit?: string
}

export const productController = {
    getAll: async (req: Request<{}, {}, {}, ProductQuery>, res: Response) => {
        const search = req.query.search
        const page = req.query.page ? parseInt(req.query.page, 10) : 1
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10

        const currentPage = isNaN(page) || page < 1 ? 1 : page
        const currentLimit = isNaN(limit) || limit < 1 ? 10 : limit
        const skip = (currentPage - 1) * currentLimit

        const [products, totalItems] = await Promise.all([
            prisma.product.findMany({
                skip,
                take: currentLimit,
                include: {
                    categories: true,
                },
                ...(search
                    ? {
                          where: {
                              name: {
                                  contains: search,
                              },
                          },
                      }
                    : {}),
            }),
            prisma.product.count({
                ...(search
                    ? {
                          where: {
                              name: {
                                  contains: search,
                              },
                          },
                      }
                    : {}),
            }),
        ])

        const totalPages = Math.ceil(totalItems / currentLimit)

        res.json({
            data: products,
            pagination: {
                page: currentPage,
                limit: currentLimit,
                totalItems,
                totalPages,
            },
        })
    },
    getById: async (req: Request<ProductParams>, res: Response) => {
        const id = +req.params.productId
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'ID không hợp lệ',
            })
        }
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                categories: true,
            },
        })

        if (!product) {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm',
            })
        }

        res.json(product)
    },
    create: async (
        req: Request<{}, {}, CreateProductRequestBody>,
        res: Response,
    ) => {
        console.log('da vao', req.body)
        const { name, price } = req.body
        if (!name) {
            return res.status(400).json({
                message: 'Tên sản phẩm là bắt buộc',
            })
        }
        if (!price) {
            return res.status(400).json({
                message: 'Giá là bắt buộc',
            })
        }
        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
            },
        })

        res.status(201).json(newProduct)
    },
    update: async (
        req: Request<ProductParams, {}, CreateProductRequestBody>,
        res: Response,
    ) => {
        const id = +req.params.productId
        const { name, price } = req.body
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID không hợp lệ' })
        }
        const isExist = await prisma.product.findUnique({
            where: { id },
        })
        if (!isExist) {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm để cập nhật',
            })
        }
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                price,
            },
        })
        res.json(updatedProduct)
    },
    delete: async (req: Request<ProductParams>, res: Response) => {
        const id = parseInt(req.params.productId)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID không hợp lệ' })
        }
        const isExist = await prisma.product.findUnique({
            where: { id },
        })
        if (!isExist) {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm để xóa',
            })
        }

        await prisma.product.delete({
            where: { id },
        })
        res.json({
            message: 'Xóa sản phẩm thành công',
        })
    },
}
