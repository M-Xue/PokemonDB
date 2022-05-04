import express from "express";
const router = express.Router();
import PokemonSpecies from "../models/PokemonSpecies"; 


router.post('/', async (req, res) => {
    const pokemoneSpecies = new PokemonSpecies({
        _id: req.body.pokedexNumber,
        name: req.body.name,
        pokedexNumber: req.body.pokedexNumber,
        type: req.body.type,
        previousEvolution: req.body.previousEvolution,
        nextEvolution: req.body.nextEvolution,
        legendary: req.body.legendary,
        pseudoLegendary: req.body.pseudoLegendary,
        eggGroup: req.body.eggGroup
    })
    try {
        const newPokemoneSpecies = await pokemoneSpecies.save();
        res.status(201).json(newPokemoneSpecies);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

export default router;