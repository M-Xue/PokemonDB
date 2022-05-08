import mongoose from "mongoose";

function typeValidator(val: string) {
    const validTypes = ['Normal', 'Fire', 'Water','Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'];
    return validTypes.includes(val);
}

const typeSchema = new mongoose.Schema({
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
})

function eggGroupValidator(val: string) {
    const validEggGroups = ['Monster', 'Water 1', 'Water 2', 'Water 3', 'Bug', 'Flying', 'Field', 'Fairy', 'Grass', 'Human-Like', 'Mineral', 'Amorphous', 'Ditto', 'Dragon', 'No Eggs Discovered', 'Gender Unknown'];
    for (let i = 0; i < val.length; i++) {
        if (validEggGroups.includes(val[i]) == false) {
            return false;
        };
    };
    return true;
}

const pokemonSpeciesSchema = new mongoose.Schema({
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
    
})

export default mongoose.model('pokemonSpecies', pokemonSpeciesSchema, 'pokemonSpecies')