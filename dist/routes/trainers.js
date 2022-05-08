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
const Trainer_1 = __importDefault(require("../models/Trainer"));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).json(req.trainer);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = new Trainer_1.default({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    });
    try {
        const newTrainer = yield trainer.save();
        res.status(200).json(newTrainer);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.firstName != null) {
        req.trainer.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
        req.trainer.lastName = req.body.lastName;
    }
    if (req.body.username != null) {
        req.trainer.username = req.body.username;
    }
    if (req.body.password != null) {
        req.trainer.password = req.body.password;
    }
    try {
        const updatedTrainer = yield req.trainer.save();
        res.status(200).json(updatedTrainer);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const pokemonID of req.trainer.pokemon) {
            const pokemon = yield Pokemon_1.default.deleteOne({ _id: pokemonID });
        }
        const deletedTrainer = yield Trainer_1.default.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Deleted trainer', trainer: deletedTrainer });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTrainers = yield Trainer_1.default.find();
        // Detelting all Pokemon relatedd to trainers
        // * You could also just delete all Pokemon directly (await Pokemon.deleteMany()) since all Pokemon have a trainer.
        for (const trainer of allTrainers) {
            for (const pokemonID of trainer.pokemon) {
                const pokemon = yield Pokemon_1.default.deleteOne({ _id: pokemonID });
            }
        }
        yield Trainer_1.default.deleteMany();
        // await allTrainers.deleteMany()
        // for (const trainer of allTrainers) {
        //     await Trainer.d
        // }
        res.status(201).json({ trainers: allTrainers });
        // res.status(201).json({ message: 'Deleted all trainers'});
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
const Pokemon_1 = __importDefault(require("../models/Pokemon"));
const PokemonSpecies_1 = __importDefault(require("../models/PokemonSpecies"));
router.post('/pokemon/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    Adding Pokemon to trainer's team
    HTTP parameters: trainer object ID
    HTTP request body:
        {
            "name",
            "level",
            "moveSet",
            "pokemonSpecies"
        }
    */
    // res.status(201).json(req.trainer._id);
    const pokemonSpecies = yield PokemonSpecies_1.default.findOne({ name: req.body.pokemonSpecies });
    if (pokemonSpecies === null) {
        res.status(400).json({ message: 'Invalid Pokemon species!' });
    }
    const pokemon = new Pokemon_1.default({
        name: req.body.name,
        level: req.body.level,
        moveSet: req.body.moveSet,
        pokemonSpecies: pokemonSpecies._id,
        trainer: req.trainer._id
    });
    try {
        const newPokemon = yield pokemon.save();
        req.trainer.pokemon.push(newPokemon._id);
        const updatedPokemonTrainer = yield req.trainer.save();
        res.status(201).json(updatedPokemonTrainer);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
function validateAndGetTrainer(req, res, next, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send('Invalid trainer ID.');
        }
        else {
            let trainer = null;
            try {
                trainer = yield Trainer_1.default.findById(id).populate('pokemon');
                if (trainer === null) {
                    res.status(400).send('Invalid trainer ID.');
                }
                else {
                    req.trainer = trainer;
                    next();
                }
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    });
}
router.param('id', validateAndGetTrainer);
exports.default = router;
