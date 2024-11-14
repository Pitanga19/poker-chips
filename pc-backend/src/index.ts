import express from 'express';
import cors from 'cors';
import { Game } from './models/gameStages';

const app = express();
const PORT = 3000;
const IP = 'localhost';

app.use(cors());
app.use(express.json());

let currentGame: Game | null = null;

app.post('/api/newGame', (req, res) => {
    currentGame = new Game();
    console.log('New game created:', currentGame);
    res.status(201).json({ message: 'New game created successfully', game: currentGame.toJSON() });
});

app.post('/api/playerList', (req, res) => {
    const playerList = req.body;

    if (!Array.isArray(playerList) || playerList.length === 0) {
        res.status(400).json({ message: 'Invalid player list' });
        return;
    }

    if (currentGame instanceof Game) {
        currentGame.playerManager.playerList = playerList;
        console.log('Received player list:', playerList);
        currentGame.positionManager.initializePositions(playerList, -1);
        console.log('Updated game data:', currentGame);
    };
    res.status(200).json({ message: 'Player list received successfully' });
});

app.get('/api/currentGame', (req, res) => {
    if (currentGame && currentGame.playerManager) {
        res.status(200).json(currentGame);
    } else {
        res.status(404).json({ message: 'No active game found.' });
    }
})

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`)
});