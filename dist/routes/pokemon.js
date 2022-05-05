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
const PokemonSpecies_1 = __importDefault(require("../models/PokemonSpecies"));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonSpecies = yield PokemonSpecies_1.default.findOne({ name: req.body.pokemonSpecies });
    const pokemon = new Pokemon_1.default({
        name: req.body.name,
        level: req.body.level,
        moveSet: req.body.moveSet,
        pokemonSpecies: pokemonSpecies._id
    });
    try {
        const newPokemon = yield pokemon.save();
        res.status(201).json(newPokemon);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemon = yield Pokemon_1.default.findById(req.params.id).populate('pokemonSpecies', 'name previousEvolution nextEvolution type');
        res.status(201).json(pokemon);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Pokemon_1.default.deleteOne({ _id: req.params.id });
        res.json({ message: 'Deleted pokemon' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
