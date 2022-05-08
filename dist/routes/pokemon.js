"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Pokemon_1 = __importDefault(require("../models/Pokemon"));
const Trainer_1 = __importDefault(require("../models/Trainer"));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemon = yield Pokemon_1.default.findById(req.params.id).populate('pokemonSpecies', 'name previousEvolution nextEvolution type');
        res.status(201).json(pokemon);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Takes the ID of the Pokemon to be deleted as a parameter.
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Updating the trainer information.
        const pokemonTrainer = yield Trainer_1.default.findById(req.pokemon.trainer);
        pokemonTrainer.pokemon = pokemonTrainer.pokemon.filter((pokemonID) => {
            return pokemonID.toString() !== req.pokemon._id.toString();
        });
        yield pokemonTrainer.save();
        yield Pokemon_1.default.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted pokemon' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name != null) {
        req.pokemon.name = req.body.name;
    }
    ;
    if (req.body.level != null) {
        req.pokemon.level = req.body.level;
    }
    ;
    if (req.body.moveSet != null) {
        req.pokemon.moveSet = req.body.moveSet;
    }
    ;
    try {
        const updatedPokemon = yield req.pokemon.save();
        res.status(201).json(updatedPokemon);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
function validateAndGetPokemon(req, res, next, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send('Invalid Pokemon ID.');
        }
        else {
            let pokemon = null;
            try {
                pokemon = yield Pokemon_1.default.findById(req.params.id);
                if (pokemon === null) {
                    res.status(400).json({ message: "Pokemon does not exist!" });
                }
                else {
                    req.pokemon = pokemon;
                    next();
                }
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    });
}
router.param('id', validateAndGetPokemon);
exports.default = router;
// ! This functionality isn't needed for this route anymore because it is in the trainer route.
// import PokemonSpecies from "../models/PokemonSpecies"
// router.post('/', async (req, res) => {
//     const pokemonSpecies = await PokemonSpecies.findOne({name: req.body.pokemonSpecies});
//     if (pokemonSpecies === null) {
//         res.status(400).json({ message: 'Invalid Pokemon species!' });
//     }
//     const pokemon = new Pokemon({
//         name: req.body.name,
//         level: req.body.level,
//         moveSet: req.body.moveSet,
//         pokemonSpecies: pokemonSpecies._id,
//         // trainer: req.body.trainer // * Delete this line if you choose not to post pokemon via trainer route
//     });
//     try {
//         const newPokemon = await pokemon.save();
//         res.status(201).json(newPokemon);
//     } catch (err: any) {
//         res.status(400).json({ message: err.message });
//     }
// }) 
