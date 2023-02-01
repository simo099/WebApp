import basicAuth from'express-basic-auth'

const BasicAuth = basicAuth({
    users: { 'foo': 'bar' },
    unauthorizedResponse: getUnauthorizedResponse
})

function getUnauthorizedResponse(req) {
    return req.auth
        ? 'Unauthorized: credentials rejected'
        : 'No credentials provided'
}

export default BasicAuth