import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import Trainer from "../models/Trainer";



router.get('/:id', async (req, res) => {
    res.status(201).json(req.trainer);
})


router.post('/', async (req, res) => {
    const trainer = new Trainer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newTrainer = await trainer.save();
        res.status(200).json(newTrainer);
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})


router.patch('/:id', async (req, res) => {
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
        const updatedTrainer = await req.trainer.save()
        res.status(200).json(updatedTrainer);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
})


router.delete('/:id', async (req, res) => {
    try {
        for (const pokemonID of req.trainer.pokemon) {
            const pokemon = await Pokemon.deleteOne({_id: pokemonID});
        }

        const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Deleted trainer', trainer: deletedTrainer });
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
})




router.delete('/', async (req, res) => {
    try {

        const allTrainers = await Trainer.find();

        // Detelting all Pokemon relatedd to trainers
        // * You could also just delete all Pokemon directly (await Pokemon.deleteMany()) since all Pokemon have a trainer.
        for (const trainer of allTrainers) {
            for (const pokemonID of trainer.pokemon) {
                const pokemon = await Pokemon.deleteOne({_id: pokemonID});
            }
        }

        await Trainer.deleteMany();
        // await allTrainers.deleteMany()
        // for (const trainer of allTrainers) {
        //     await Trainer.d
        // }
        res.status(201).json({ trainers: allTrainers});
        // res.status(201).json({ message: 'Deleted all trainers'});
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
})












import Pokemon from "../models/Pokemon";
import PokemonSpecies from "../models/PokemonSpecies"
router.post('/pokemon/:id', async (req, res) => {

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

    const pokemonSpecies = await PokemonSpecies.findOne({name: req.body.pokemonSpecies});
    if (pokemonSpecies === null) {
        res.status(400).json({ message: 'Invalid Pokemon species!' });
    }
    const pokemon = new Pokemon({
        name: req.body.name,
        level: req.body.level,
        moveSet: req.body.moveSet,
        pokemonSpecies: pokemonSpecies._id,
        trainer: req.trainer._id
    });

    try {
        const newPokemon = await pokemon.save();
        req.trainer.pokemon.push(newPokemon._id) 
        const updatedPokemonTrainer = await req.trainer.save();
        res.status(201).json(updatedPokemonTrainer);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
})


async function validateAndGetTrainer (req: Request, res: Response, next: NextFunction, id: any) {

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).send('Invalid trainer ID.');
    } else {
        let trainer = null;
        try {
            trainer = await Trainer.findById(id).populate('pokemon');

            if (trainer === null) {
                res.status(400).send('Invalid trainer ID.');
            } else {
                req.trainer = trainer;
                next()
            }
        } catch (err: any) {
            res.status(400).json({message: err.message});
        }
    }
}

router.param('id', validateAndGetTrainer);


export default router;