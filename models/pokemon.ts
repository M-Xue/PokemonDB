import mongoose from 'mongoose';

function moveSetValidator(val: string) {
    if (val.length < 1 || val.length > 4) {
        return false;
    }
}

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pokemonSpecies: { 
        type: mongoose.Schema.Types.ObjectId, 
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'trainer',
        required: true 
    },
})


export default mongoose.model('pokemon', pokemonSchema, 'pokemon');
