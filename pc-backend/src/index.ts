import express from 'express';
import * as models from './models'

const app = express();
const PORT = 3000;

const pot = new models.Pot();

const playerLuchi = new models.Player('luchi');
const playerMaci = new models.Player('maci');

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