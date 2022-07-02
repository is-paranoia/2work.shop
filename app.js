const express = require('express')
const config = require('config')
const body_parser = require('body-parser')
const {Client} = require('pg')
const knex = require('./knex/knex')


const app = express()
app.use(express.json())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

const PORT = config.get('port') || 8000


async function start() {
    try {
        app.listen(PORT, () => console.log(`App has been started at port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

