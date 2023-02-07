import { json } from 'express';
import express from 'express';
import pgpromise from 'pg-promise';
import auth from './middleware/basic-auth.js';
import { isValid } from './validator.js';
const app = express();
const port = 3000;
const pgp = pgpromise({});

/** 
 * Define the Database Url as an Enviroment Variable, which will be declared in the command prompt.
 * @constant db
 */ 
const db = pgp(process.env["DB_URL"]);

/**
 * Use Express.
 * @constant app
 * @requires module express 
 */
app.use(express.json());

/** 
 * Use basic authentication.
 * @constant app
 * @requires module auth
 */ 
app.use(auth);

/** 
 * Retrieve users's data from Database.
 * @constant app
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
 * Retrieve the data of an individual user from the Database.
 * @constant app
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
 * Enter data into the Database
 * @constant app
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
 * Patch the data of a single user in the Database by id
 * @constant app
 * @async
 * @param {*} req
 * @param {*} res
 * @requires isValid
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

    if(isValid(req)){
        await db.none(`UPDATE users SET first_name=$(first_name), last_name=$(last_name), address=$(address) WHERE id=${id}`, req.body)
        res.send()
    }
    else{
      res.status(400).json({status: 400, message: "Bad Request", validation: false});  
    }
})

/** 
 * Delete the data of a single user in the Database by id.
 * @constant app
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