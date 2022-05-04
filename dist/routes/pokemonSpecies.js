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
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemoneSpecies = new PokemonSpecies_1.default({
        _id: req.body.pokedexNumber,
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
        const newPokemoneSpecies = yield pokemoneSpecies.save();
        res.status(201).json(newPokemoneSpecies);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
exports.default = router;
