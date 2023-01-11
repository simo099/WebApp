const { json } = require('express');
const express = require('express');
const pgp = require('pg-promise')();

const app = express();
const port = 3000;

const db = pgp(process.env["DB_URL"]);

app.use(express.json());

app.get('/users', async (req, res) => {
    const data = await db.query("SELECT * FROM users")
    res.send(data);
})

app.put('/users', async (req, res) => {
    if((req.body.first_name === '')||(req.body.first_name === null)){
        return res.status(400).json({status: 400, message: "Bad Request"});
    }
    else if((req.body.last_name === '')||(req.body.last_name === null)){
        return res.status(400).json({status: 400, message: "Bad Request"});
    }
    else if((req.body.address === '')||(req.body.address === null)){
        return res.status(400).json({status: 400, message: "Bad Request"});
    }
    else{
        await db.none("INSERT INTO users(first_name, last_name, address) VALUES (${first_name},${last_name},${address})",
            req.body
        )
        res.send()
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})