import GameModel from './game';
import DeckModel from './deck';
import PawnModel from './pawn'
import PlayerModel from './player';
import HandModel from './hand';
import CemetaryModel from './cemetary';
import BoardModel from './board';

export default {
    "game": {
        "class": GameModel,
        "param": '{}'
    },
    "deck": {
        "class": DeckModel,
        "param": '{"cards" : [{"face":"card-1"}, {"face":"card-2"}, {"face":"card-3"}, {"face":"card-4"}, {"face":"card-5"}, {"face":"card-6"}]}'
    },
    "player": {
        "class": PlayerModel,
        "param": '{"cards":[]}'
    },
    "hand": {
        "class": HandModel,
        "param": '{"cards":[]}'
    },
    "pawn": {
        "class": PawnModel,
        "param": '{}'
    },
    "cemetary": {
        "class": CemetaryModel,
        "param": '{"cards":[]}'
    },
    "board": {
        "class": BoardModel,
        "param": '{"cards":[]}'
    }

}