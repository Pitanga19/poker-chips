import express from 'express';
import cors from 'cors';
import { PORT, IP } from './utils/constants';
import { newGame, playerList, currentGame, currentToExecuteValidator, avalibleActions, playerAction, winnerSelect } from './controllers/gameController';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/newGame', newGame);

app.post('/api/playerList', playerList);

app.get('/api/currentGame', currentGame);

app.get('/api/currentToExecuteValidator', currentToExecuteValidator);

app.get('/api/avalibleActions', avalibleActions);

app.post('/api/playerAction', playerAction);

app.post('/api/winnerSelect', winnerSelect);

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`)
});