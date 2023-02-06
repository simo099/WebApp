import { json } from 'express';
import express from 'express';
import pgpromise from 'pg-promise';
import auth from './middleware/basic-auth.js';
import { isValid } from './validator.js';
const app = express();
const port = 3000;
const pgp = pgpromise({});

/** 
* Define the Database Url as Enviroment Variable, which will be declared in the command prompt
*/ 
const db = pgp(process.env["DB_URL"]);

app.use(express.json());

/** 
* Use basic authentication
*/ 
app.use(auth);

/** 
 * Get/Read data from Database
*/
app.get('/users', async (req, res) => {
    /** 
     * Retrieve users's data from Database
    */ 
    const data = await db.query("SELECT * FROM users");
    res.send(data)
})

/** 
* Retrieve a single user's data from Database by id
*/ 
app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const data = await db.query("SELECT * FROM users WHERE id = $1", [id])
    res.send(data);
})

/** 
 * Enter data into the Database
*/
app.put('/users', async (req, res) => {
    /**
     * Call isValid function to check whether the data entered are correct, before being entered into the Database.
    */
    if(isValid(req)){
        await db.none("INSERT INTO users(first_name, last_name, address) VALUES ($(first_name),$(last_name),$(address))", req.body)
        res.statusCode = 201;
        res.send()
    }else{
        res.status(400).json({status: 400, message: "Bad Request", validation: false});
    }
})

/** 
* Patch the data of a single user in the Database by id
*/ 
app.patch('/users/:id', async (req, res) => {
    const id = req.params.id
    await db.none(`UPDATE users SET first_name=$(first_name), last_name=$(last_name), address=$(address) WHERE id=${id}`, req.body)
    res.send();
})

/** 
* Delete the data of a single user in the Database by id
*/
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    const data = await db.query("DELETE FROM users WHERE id=$1", [id])
    res.send(data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})