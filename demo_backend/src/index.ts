import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import apiRouter from './api/apiRouter'

const app = express()
const port = process.env.PORT ?? 3000
app.use(cors())

app.use('/api', apiRouter)

app.listen(port, () => {
    console.log('Test chạy', port)
})
