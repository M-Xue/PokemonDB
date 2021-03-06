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
const PokemonSpecies_1 = __importDefault(require("../models/PokemonSpecies"));
// Creating a new Pokemon species.
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonSpecies = new PokemonSpecies_1.default({
        name: req.body.name,
        pokedexNumber: req.body.pokedexNumber,
        type: req.body.type,
        previousEvolution: req.body.previousEvolution,
        nextEvolution: req.body.nextEvolution,
        legendary: req.body.legendary,
        pseudoLegendary: req.body.pseudoLegendary,
        eggGroup: req.body.eggGroup
    });
    try {
        const newPokemonSpecies = yield pokemonSpecies.save();
        res.status(201).json(newPokemonSpecies);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Getting the Pokemon species by Pokedex ID using route parameters.
router.get('/pokedexID/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokedexID = req.params.id;
    try {
        const pokemonSpecies = yield PokemonSpecies_1.default.findOne({ pokedexNumber: pokedexID });
        if (pokemonSpecies == null) {
            throw new Error('invalid Pokedex ID.');
        }
        res.status(201).json(pokemonSpecies);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Getting the Pokemon species by name using a query string parameter in the route.
router.get('/name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pokemonSpeciesName = req.query.name;
    if (typeof (pokemonSpeciesName) === "string") {
        pokemonSpeciesName = pokemonSpeciesName.charAt(0) + pokemonSpeciesName.substring(1).toLowerCase();
    }
    try {
        const pokemonSpecies = yield PokemonSpecies_1.default.findOne({ name: pokemonSpeciesName });
        if (pokemonSpecies == null) {
            throw new Error('invalid Pokemon species name.');
        }
        res.status(201).json(pokemonSpecies);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// * Updating evolutions
// router.patch('/name', async (req, res) => {
//     let pokemonSpeciesName = req.body.name;
//     if (typeof(pokemonSpeciesName) === "string") {
//         pokemonSpeciesName = pokemonSpeciesName.charAt(0) + pokemonSpeciesName.substring(1).toLowerCase();
//     }
//     let previousEvolutionName = '';
//     if (req.body.previousEvolutionName != null) {
//         previousEvolutionName = req.body.previousEvolutionName;
//     }
//     let nextEvolutionName = '';
//     if (req.body.nextEvolutionName != null) {
//         nextEvolutionName = req.body.nextEvolutionName;
//     }
// })
exports.default = router;
