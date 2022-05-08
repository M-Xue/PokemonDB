import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import mongoose from "mongoose";

import Pokemon from "../models/Pokemon";
import Trainer from "../models/Trainer";

router.get('/:id', async (req,res) => {
    try { 
        const pokemon = await Pokemon.findById(req.params.id).populate('pokemonSpecies', 'name previousEvolution nextEvolution type');
        res.status(201).json(pokemon)
    } catch (err:any) {
        res.status(400).json({message: err.message})
    }
})

// Takes the ID of the Pokemon to be deleted as a parameter.
router.delete('/:id', async (req, res) => {
    try {
        // Updating the trainer information.
        const pokemonTrainer = await Trainer.findById(req.pokemon.trainer);
        pokemonTrainer.pokemon = pokemonTrainer.pokemon.filter((pokemonID: mongoose.Schema.Types.ObjectId) => {
            return pokemonID.toString() !== req.pokemon._id.toString();
        });
        await pokemonTrainer.save();
        
        await Pokemon.deleteOne({_id: req.params.id})
        res.json({ message: 'Deleted pokemon' })
    } catch (err:any) {
        res.status(500).json({ message: err.message})
    }
}) 

router.patch('/:id', async (req, res) => {
    if (req.body.name != null) {
        req.pokemon.name = req.body.name;
    };

    if (req.body.level != null) {
        req.pokemon.level = req.body.level;
    };

    if (req.body.moveSet != null) {
        req.pokemon.moveSet = req.body.moveSet;
    };

    try {
        const updatedPokemon = await req.pokemon.save()
        res.status(201).json(updatedPokemon)
    } catch (err:any) {
        res.status(500).json({ message: err.message})
    } 
});

async function validateAndGetPokemon(req: Request, res: Response, next: NextFunction, id: any) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).send('Invalid Pokemon ID.');
    } else {
        let pokemon = null;
        try {
            pokemon = await Pokemon.findById(req.params.id);
            if (pokemon === null) {
                res.status(400).json({message: "Pokemon does not exist!"});
            } else {
                req.pokemon = pokemon;
                next()  
            }
        } catch (err: any) {
            res.status(400).json({message: err.message});
        }
    }
}











router.param('id', validateAndGetPokemon)

export default router





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