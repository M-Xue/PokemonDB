"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trainerSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    pokemon: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'pokemon',
            required: false
        }],
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('trainer', trainerSchema, 'trainers');
