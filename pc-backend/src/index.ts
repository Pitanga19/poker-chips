import express from 'express';
import cors from 'cors';
import { newGame, playerList, game, currentAvalibleActions, playerAction } from './controllers/gameController';

const app = express();
const PORT = 3000;
const IP = 'localhost';

app.use(cors());
app.use(express.json());

app.post('/api/newGame', newGame);

app.post('/api/playerList', playerList);

app.get('/api/currentGame', game);

app.get('/api/currentAvalibleActions', currentAvalibleActions);

app.post('/api/playerAction', playerAction);

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`)
});