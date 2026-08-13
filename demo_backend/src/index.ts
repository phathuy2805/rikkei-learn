import cors from 'cors'
import 'dotenv/config'
import express, {
    type NextFunction,
    type Request,
    type Response,
} from 'express'
import apiRouter from './api/apiRouter'

const app = express()
const port = process.env.PORT ?? 3000
app.use(cors())

app.use('/api', apiRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
})

app.listen(port, () => {
    console.log('Test chạy', port)
})
