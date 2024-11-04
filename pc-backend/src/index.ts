import express from 'express';

// import models
import * as chips from './models/chipHolders';
import * as actions from './models/gameActions'
import * as flow from './models/gameFlow';

const app = express();
const PORT = 3000;

const pot = new chips.Pot();

const playerLuchi = new chips.Player('luchi');
const playerMaci = new chips.Player('maci');

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