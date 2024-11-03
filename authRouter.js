const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require("express-validator");
// const authMiddleware = require("./middleware/authMiddleware");
const roleAuthMiddleware = require("./middleware/roleAuthMiddlware");

router.post ('/registration', [
    check('username', "username can't be an empty").notEmpty(),
    check("password", "password must be more than 5 characters").isLength({min:5})] ,
    controller.registration);
router.post('/login', controller.login);
router.get('/users', roleAuthMiddleware(["ADMIN"]), controller.getUsers); // * here you can add another roles with function roleAuthMiddleware.
router.get('/admin/create', controller.createAdmin);
router.get('/users/create', controller.createUser);

module.exports = router;