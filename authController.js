const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("./token/config");
const  tokenGenerator  = require("./token/tokenGenerator");
const { validationResult } = require("express-validator");

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors });
            }
            const { username, password, role="USER" } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: "User with that username already exists" });
            }
            const hashPass = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: role });
            const user = new User({ username, password: hashPass, roles: [userRole.value] });
            await user.save();
            return res.json({ message: "Successfully registered!" });
        } catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Registration error!" });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const validUser = await User.findOne({ username });
            console.log(username, password)
            if (!validUser) {
                return res.status(404).json({ message: "No user found with that username." });
            }
            const validPassword = bcrypt.compareSync(password, validUser.password);
            if (!validPassword) {
                return res.status(401).json({message: "Password or username was incorrect. Try again."});
            }

            const token = tokenGenerator(validUser._id, validUser.roles);
            return res.json({ token });
        } catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Login error!" });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Error fetching users." });
        }
    }

    async createUser(req, res) {
        try {
            const userRole = new Role();
            await userRole.save();
            res.json("User successfully created!");
        } catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Error creating user." });
        }
    }

    async createAdmin(req, res) {
        try {
            const adminRole = new Role({ value: "ADMIN" });
            await adminRole.save();
            res.json("Admin successfully created!");
        } catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Error creating admin." });
        }
    }
}

module.exports = new authController();
