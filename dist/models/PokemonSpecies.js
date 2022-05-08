"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function typeValidator(val) {
    const validTypes = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'];
    return validTypes.includes(val);
}
const typeSchema = new mongoose_1.default.Schema({
    primaryType: {
        type: String,
        required: true,
        validate: [typeValidator, 'Invalid type!']
    },
    secondaryType: {
        type: String,
        required: false,
        validate: [typeValidator, 'Invalid type!']
    }
});
function eggGroupValidator(val) {
    const validEggGroups = ['Monster', 'Water 1', 'Water 2', 'Water 3', 'Bug', 'Flying', 'Field', 'Fairy', 'Grass', 'Human-Like', 'Mineral', 'Amorphous', 'Ditto', 'Dragon', 'No Eggs Discovered', 'Gender Unknown'];
    for (let i = 0; i < val.length; i++) {
        if (validEggGroups.includes(val[i]) == false) {
            return false;
        }
        ;
    }
    ;
    return true;
}
const pokemonSpeciesSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pokedexNumber: {
        type: Number,
        required: true,
        unique: true
    },
    type: typeSchema,
    previousEvolution: {
        type: String,
        required: false,
        default: null
    },
    nextEvolution: {
        type: String,
        required: false,
        default: null
    },
    legendary: {
        type: Boolean,
        required: true
    },
    pseudoLegendary: {
        type: Boolean,
        required: true
    },
    eggGroup: {
        type: [String],
        required: true,
        validate: [eggGroupValidator, 'Invalid Egg Group!']
    }
});
exports.default = mongoose_1.default.model('pokemonSpecies', pokemonSpeciesSchema, 'pokemonSpecies');
