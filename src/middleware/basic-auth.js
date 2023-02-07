import basicAuth from'express-basic-auth'

/** 
* Define basic authentication.
* @constant auth
* @requires module basicAuth
*/ 
const auth = basicAuth({
    /** 
    * Set users {username: password}
    */ 
    users: { 'foo': 'bar' },
    /** 
    * Get an unauthorized response when username and data aren't correct or missing.
    * @function getUnauthorizedResponse
    * @todo Returns an unauthorized response.
    */ 
    unauthorizedResponse: getUnauthorizedResponse
})

function getUnauthorizedResponse(req) {
    return req.auth
        ? 'Unauthorized: credentials rejected'
        : 'No credentials provided'
}

/**
 * A module for basic authentication.
 * @module auth
 * @default
 */
export default auth