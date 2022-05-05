import express from "express";
const router = express.Router();

import Pokemon from "../models/Pokemon";
import PokemonSpecies from "../models/PokemonSpecies"

router.post('/', async (req, res) => {

    const pokemonSpecies = await PokemonSpecies.findOne({name: req.body.pokemonSpecies});
    const pokemon = new Pokemon({
        name: req.body.name,
        level: req.body.level,
        moveSet: req.body.moveSet,
        pokemonSpecies: pokemonSpecies._id
    });

    try {
        const newPokemon = await pokemon.save();
        res.status(201).json(newPokemon);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }

}) 

router.get('/:id', async (req,res) => {
    try { 
        const pokemon = await Pokemon.findById(req.params.id).populate('pokemonSpecies', 'name previousEvolution nextEvolution type');
        res.status(201).json(pokemon)
    } catch (err:any) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Pokemon.deleteOne({_id: req.params.id})
        res.json({ message: 'Deleted pokemon' })
    } catch (err:any) {
        res.status(500).json({ message: err.message})
    }
})

export default router