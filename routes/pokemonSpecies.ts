import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import PokemonSpecies from "../models/PokemonSpecies"; 

// Creating a new Pokemon species.
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
    });
    try {
        const newPokemonSpecies = await pokemonSpecies.save();
        res.status(201).json(newPokemonSpecies);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

// Getting the Pokemon species by Pokedex ID using route parameters.
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

// Getting the Pokemon species by name using a query string parameter in the route.
router.get('/name', async (req, res) => {
    let pokemonSpeciesName = req.query.name;
    if (typeof(pokemonSpeciesName) === "string") {
        pokemonSpeciesName = pokemonSpeciesName.charAt(0) + pokemonSpeciesName.substring(1).toLowerCase();
    }
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

export default router;