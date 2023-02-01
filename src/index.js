import { json } from 'express';
import express from 'express';
import pgpromise from 'pg-promise';
import auth from './middleware/basic-auth.js';

const app = express();
const port = 3000;
const pgp = pgpromise({});

const db = pgp(process.env["DB_URL"]);

app.use(express.json());
app.use(auth);

export function isValid(req){
    if(req.body.first_name && req.body.last_name && req.body.address)
        return true;
    return false;
        //return res.status(400).json({status: 400, message: "Bad Request", validation: false});
}

app.get('/users', async (req, res) => {
    const data = await db.query("SELECT * FROM users");
    res.send(data)
})

app.put('/users', async (req, res) => {
    if(isValid(req)){
        await db.none("INSERT INTO users(first_name, last_name, address) VALUES ($(first_name),$(last_name),$(address))", req.body)
        res.statusCode = 201;
        res.send()
    }else{
        res.status(400).json({status: 400, message: "Bad Request", validation: false});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
