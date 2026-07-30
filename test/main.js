import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, 'db.json')

const myServer = http
    .createServer((req, res) => {
        if ((req.url.startsWith('/users') || req.url.startsWith('/students')) && req.method === 'GET') {
            fs.readFile(dbPath, 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/plain')
                    res.end('Internal Server Error')
                    return
                }
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(data)
            })
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end('Not Found')
        }
    })
    .listen(4000, () => {
        console.log('Server running at port 4000')
    })
