/**
 * 
 * @function createTable
*/

async function createTable(db){
    var query = "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name varchar(16) NOT NULL, last_name varchar(16) NOT NULL, address varchar(50) NOT NULL)"
    await db.query(query)
}

export default createTable
