/**
 * 
 * @param {*} body 
 * @function createPatchQuery
*/

function createPatchQuery(body){
 var query = "UPDATE users SET "+Object.keys(body).map(it => it+"=$("+it+")")
 console.log(query)
 return query
}

export default createPatchQuery