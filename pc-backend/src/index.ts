import express from 'express';

// import models
import { Player, Pot } from './models/chipHolders'
import { BetRound } from './models/gameFlow';
import { TurnOptionsManager } from './models/gameActions';

const app = express();
const PORT = 3000;

const pot = new Pot();

const playerLuchi = new Player('luchi');
const playerMaci = new Player('maci');

app.get('/', (req, res) => {
    res.send('¡Bienvenidos a Poker Chips!');
});

app.get('/api/pot', (req, res) => {
    res.json(pot);
});

app.get('/api/players', (req, res) => {
    res.json([ playerLuchi, playerMaci ]);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});