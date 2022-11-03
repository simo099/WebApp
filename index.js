const { json } = require('express')
const express = require('express')
const pgp = require('pg-promise')();

const app = express()
const port = 3000

const db = pgp(process.env["DB_URL"])

app.use(express.json());

app.get('/users', async (req, res) => {
    const data = await db.query("SELECT * FROM users")
    res.send(data)
})
app.put('/users', async (req, res) => {
    await db.none("INSERT INTO users(first_name, last_name) VALUES (${first_name},${last_name})",
            req.body
    )
    res.send()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})