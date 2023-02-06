import basicAuth from'express-basic-auth'

/** 
* Define basic authentication
*/ 
const auth = basicAuth({
    /** 
    * Set users {username: password}
    */ 
    users: { 'foo': 'bar' },
    /** 
    * Get an unauthorized response when username and data aren't correct or missing
    */ 
    unauthorizedResponse: getUnauthorizedResponse
})

function getUnauthorizedResponse(req) {
    return req.auth
        ? 'Unauthorized: credentials rejected'
        : 'No credentials provided'
}

export default auth