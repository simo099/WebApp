const { json } = require('express');
const express = require('express');
const pgp = require('pg-promise')();
const auth = require('./middleware/basic-auth.ts');

const app = express();
const port = 3000;

const db = pgp(process.env["DB_URL"]);

app.use(express.json());
app.use(auth);

async function validation(req, res){
    if((!req.body.first_name)||(!req.body.last_name)||(!req.body.address)){
        return res.status(400).json({status: 400, message: "Bad Request", validation: false});
    }
    else{
        res.json({validation: true});
        await db.none("INSERT INTO users(first_name, last_name, address) VALUES (${first_name},${last_name},${address})",
        req.body
        )
    }
}

app.get('/users', async (req, res) => {
    const data = await db.query("SELECT * FROM users");
    res.send(data)
})

app.put('/users', (req, res) => {
    validation(req, res);
    res.send()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})