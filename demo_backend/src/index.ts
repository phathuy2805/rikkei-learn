import cors from 'cors'
import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT ?? 3000
app.use(cors())

app.listen(port, () => {
    console.log('Test chạy', port)
})
