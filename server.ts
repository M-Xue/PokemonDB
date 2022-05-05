import express from 'express';
// const express = require('express');
// import type { Request, Response } from 'express';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Official Documentation Method: https://mongoosejs.com/docs/index.html
async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
}
main().catch(err => console.log(err)); // For handling initial connection errors: https://mongoosejs.com/docs/connections.html#error-handling 
const db = mongoose.connection;
db.on("error", (error) => console.error(error)); // For errors after initial connection was established: https://mongoosejs.com/docs/connections.html#error-handling
db.once("open", () => console.log('Connected to Database'));


app.use(express.json()); 

// app.get('/', (req, res) => (
//     res.send(req.query); 

// ));

import pokemonSpeciesRouter from './routes/pokemonSpecies';
app.use('/pokemonSpecies', pokemonSpeciesRouter); 

import pokemonRouter from './routes/pokemon';
app.use('/pokemon', pokemonRouter)

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));



