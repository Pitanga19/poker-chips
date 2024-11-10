import { Player, PlayerManager, Pot } from "./models/chipHolders";
import { Game, HandStage, BettingStageValidator, BettingStage, PositionManager, TurnValidator } from "./models/gameFlow";
import { ActionSelector, PlayerActions } from "./models/playerActions";

const player1 = new Player('maci');
const player2 = new Player('luchi');
const player3 = new Player('hugo');
const player4 = new Player('ana');

const playerList = [player1, player2, player3, player4];

const game = new Game();
game.playerManager.playerList = playerList;

