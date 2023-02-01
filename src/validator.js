export function isValid(req){
    if(req.body && req.body.first_name && req.body.last_name && req.body.address)
        return true;
    return false;
}