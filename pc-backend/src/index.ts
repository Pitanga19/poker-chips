import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
const IP = 'localhost';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Welcome to Poker Chips!');
});

app.post('/api/playerList', (req, res) => {
    const playerList = req.body;

    if (!Array.isArray(playerList) || playerList.length === 0) {
        res.status(400).json({ message: 'Invalid player list' });
        return;
    }

    console.log('Received player list:', playerList);

    res.status(200).json({ message: 'Player list received successfully' });
})

app.listen(PORT, IP, () => {
    console.log(`Server running at http://${IP}:${PORT}`)
});