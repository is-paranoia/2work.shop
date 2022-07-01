const express = require('express')
const config = require('config')
const {Client} = require('pg')


const app = express()
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 8000
const postgres = new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "root",
    database: "postgres"
})

async function start() {
    try {
        await postgres.connect()
        app.listen(PORT, () => console.log(`App has been started at port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

