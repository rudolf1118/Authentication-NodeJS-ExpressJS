const jwt = require("jsonwebtoken");
const {secret} = require("../token/config");
module.exports = function (roles) {
    return (function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try{
            const token = (req.headers.Authorization || req.headers.authorization || req.headers.au).split(" ")[1];
            if (!token) {
                return (res.status(403).json({message:"credential are invalid or forbidden"}));
            }
            const {roles:arrayOfRoles} = jwt.verify(token, secret);
            console.log(arrayOfRoles);
            let hasRole = false;
            arrayOfRoles.forEach((role)=>{
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return (res.status(403).json({message:"forbidden"}));
            }
            next();
        } catch(e){
            console.error(e);
            return (res.status(403).json({message:"Authorization was not found/forbidden or expired"}));
        }
    })
}