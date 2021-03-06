"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function moveSetValidator(val) {
    if (val.length < 1 || val.length > 4) {
        return false;
    }
}
const pokemonSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    pokemonSpecies: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'pokemonSpecies',
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    moveSet: {
        type: [String],
        required: true,
        validate: [moveSetValidator, 'Incorrect number of moves!']
    },
    trainer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'trainer',
        required: true
    },
});
exports.default = mongoose_1.default.model('pokemon', pokemonSchema, 'pokemon');
