import { json } from 'express';
import express from 'express';
import pgpromise from 'pg-promise';
import auth from './middleware/basic-auth.js';
import { isValid } from './validator.js';
import createPatchQuery from './util.js';

/**
 * Define app(that imports express top-level function from express module), port, and pgpromise.
 * @constant app
 * @constant port
 * @constant pgp
 * @requires module express 
*/
const app = express();
const port = 3000;
const pgp = pgpromise({});

/** 
 * Define the Database Url as an Enviroment Variable, which will be declared in the command prompt.
 * @constant db
*/ 
const db = pgp(process.env["DB_URL"]);

/**
 * Use top-level express function imported from express module, returns middleware that only parses 
 * json and only looks at requests where the Content-Type header matches the type option.
 * @requires module express 
*/
app.use(express.json());

/** 
 * Use basic authentication.
 * @requires module auth
*/ 
app.use(auth);

/** 
 * Get users's data from Database.
 * @async
 * @param {*} req
 * @param {*} res
*/
app.get('/users', async (req, res) => {
    /** 
     * Define data.
     * @constant data
    */ 
    const data = await db.query("SELECT * FROM users");
    res.send(data)
})

/** 
 * Get the data of a single user from the Database by id.
 * @async
 * @param {*} req
 * @param {*} res
*/ 
app.get('/users/:id', async (req, res) => {
    /**
     * Request user's data by id.
     * @callback req~requestCallback
    */

    /**
     * Define the user's id
     * @constant id 
    */
    const id = req.params.id
    
    /**
     * Define data.
     * @constant data
    */
    const data = await db.query("SELECT * FROM users WHERE id = $1", [id])
    res.send(data);
})

/** 
 * Enter data into the Database.
 * @async
 * @param {*} req
 * @param {*} res
 * @requires isValid
*/
app.put('/users', async (req, res) => {
    /**
     * Request users's data. 
     * @callback req~requestCallback
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
 * Modify the data of a single user into the Database by id.
 * @async
 * @param {*} req
 * @param {*} res
 * @requires createPatchQuery
*/ 
app.patch('/users/:id', async (req, res) => {
    /**
     * Request user's data by id.
     * @callback req~requestCallback
    */
   
    /**
     * Define the user's id
     * @constant id 
    */
    const id = req.params.id

    await db.query(createPatchQuery(req.body)+` WHERE id=${id}`, req.body)
    res.send()
})

/** 
 * Delete the data of a single user in the Database by id.
 * @param {*} req
 * @param {*} res
*/
app.delete('/users/:id', async (req, res) => {
    /**
    * Request user's data by id.
    * @callback req~requestCallback
    */

    /**
     * Define user's id.
     * @constant id 
    */
    const id = req.params.id
    
    /**
     * Define data.
     * @constant data
    */
    const data = await db.query("DELETE FROM users WHERE id=$1", [id])
    res.send(data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})