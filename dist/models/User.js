"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.UserModel = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create schema to generate model
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 30 },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255,
    },
    password: { type: String, required: true, minlength: 4, maxlength: 1024 },
    isAdmin: Boolean,
});
// Add method to generate Auth Token
userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1 day',
    });
    return token;
};
// Create model for the user data colleaction
const UserModel = mongoose_1.default.model('users', userSchema);
exports.UserModel = UserModel;
// Function to validate data from an incoming request
function validateUser(user) {
    // TODO: Look into joi-password-complexity
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(1).max(30),
        email: joi_1.default.string().required().email().min(6).max(50),
        password: joi_1.default.string().required().min(4).max(25),
    });
    return schema.validate(user);
}
exports.validateUser = validateUser;
