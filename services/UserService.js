const UserDTO = require("../dtos/UserDTO");
const jwt = require("jsonwebtoken");
const { createHash, verifyPassword } = require("../src/passwordValidation");
const sendMail = require("../src/sendEmail");
const UserValidator = require("../validators/UserValidator");

class UserService {
    constructor(repository) {
        this.repository = repository;
        this.validator = new UserValidator();
    }

    async createUser(user) {
        await this.validator.validate(user);
        const newUser = await this.repository.createUser(user);
        return newUser;
    }

    async getByEmail(email) {
        return await this.repository.getByEmail(email);
    }

    async getById(id) {
        return await this.repository.getById(id);
    }

    async signUp(user) {
        if (user.password !== user.repeatPassword) return { msg: "passwords must match", error: true };

        const userExists = await this.getByEmail(user.email);
        if (userExists) return { error: true, msg: "user already exists" };

        const newUser = {
            email: user.email,
            password: createHash(user.password),
            name: user.name,
            phone: user.phone,
            address: user.address,
        };
        const newUserDB = await this.createUser(newUser);

        const userDTO = new UserDTO(newUserDB);

        const userWithToken = this._generateToken(Object.assign({}, userDTO));

        await sendMail(process.env.ADMIN_EMAIL, "Nuevo Registro", JSON.stringify(userDTO, null, 2));
        delete userWithToken.password;
        return userWithToken;
    }

    async signIn(user) {
        const userDB = await this.getByEmail(user.email);
        if (!userDB) return { error: true, msg: "user not found" };
        if (!verifyPassword(user.password, userDB)) return { error: true, msg: "incorrect password" };
        const userDTO = new UserDTO(userDB);
        const userWithToken = this._generateToken(Object.assign({}, userDTO));
        delete userWithToken.password;
        return userWithToken;
    }

    _generateToken(payload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
        const newObject = Object.assign(payload, { token });
        return newObject;
    }
}

module.exports = UserService;