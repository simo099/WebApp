/**
 * Represents a validation
 * @function isValid
 * @param {*} req 
 * @returns {boolean} true or false
 * Value | Description
 *-------|------------
 * true  | user's data is valid
 * false | user's data isn't valid
*/
export function isValid(req){
    if(req.body && req.body.first_name && req.body.last_name && req.body.address)
        return true;
    return false;
}