const {secret} = require("./config");
const jwt = require("jsonwebtoken");

module.exports =  (id, roles) =>{
    const payload = {id, roles};
    return (jwt.sign(payload, secret, {expiresIn: "1h"}))
}