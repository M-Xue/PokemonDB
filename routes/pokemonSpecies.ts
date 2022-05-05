import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import PokemonSpecies from "../models/PokemonSpecies"; 


router.post('/', async (req, res) => {

    const pokemonSpecies = new PokemonSpecies({
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
        const newPokemonSpecies = await pokemonSpecies.save();
        res.status(201).json(newPokemonSpecies);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/pokedexID/:id', async (req, res) => {
    const pokedexID = req.params.id;
    try {
        const pokemonSpecies = await PokemonSpecies.findOne({pokedexNumber: pokedexID});
        if (pokemonSpecies == null) {
            throw new Error('invalid Pokedex ID.');
        }
        res.status(201).json(pokemonSpecies);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/name', async (req, res) => {
    const pokemonSpeciesName = req.query.name;
    try {
        const pokemonSpecies = await PokemonSpecies.findOne({ name: pokemonSpeciesName });
        if (pokemonSpecies == null) {
            throw new Error('invalid Pokemon species name.');
        }
        res.status(201).json(pokemonSpecies);
    } catch (err:any) {
        res.status(400).json({ message: err.message })
    }
})

export default router;