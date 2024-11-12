import { Player, PlayerManager, Pot } from "./models/chipHolders";
import { BettingStageValidator, PositionManager, TurnValidator } from "./models/gameFlow";
import { Game, HandStage, BettingStage } from "./models/gameStages";
import { ActionSelector, PlayerActions } from "./models/playerActions";

const player1 = new Player('maci', 300);
const player2 = new Player('luchi', 300);
const player3 = new Player('hugo', 300);
const player4 = new Player('ana', 300);
const playerList = [player1, player2, player3, player4];

const game = new Game();
const playerManager = game.playerManager;
const pot = game.pot;
const handStageValidator = game.handStageValidator;
const handStage = game.handStage;
const bettingStageValidator = game.bettingStageValidator;
const bettingStage = game.bettingStage;
const positionManager = game.positionManager;
const turnValidator = game.turnValidator;
const actionSelector = game.actionSelector;
const playerActions = game.playerActions;

playerManager.playerList = playerList;
