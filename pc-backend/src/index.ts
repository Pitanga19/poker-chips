import express from 'express';
import cors from 'cors';
import { newGame, playerList, avalibleActionsValidation, playerAction, currentGame } from './controllers/gameController';

const app = express();
const PORT = 3000;
const IP = 'localhost';

app.use(cors());
app.use(express.json());

app.post('/api/newGame', newGame);

app.post('/api/playerList', playerList);

app.get('/api/currentGame', currentGame);

app.get('/api/avalibleActionsValidation', avalibleActionsValidation);

app.post('/api/playerAction', playerAction);

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`)
});