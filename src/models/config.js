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
        "param": `{"cards" : [
        {"face":"card-1","life":30,"strength":30,"def":50}, 
        {"face":"card-2","life":20,"strength":40,"def":20}, 
        {"face":"card-3","life":40,"strength":50,"def":10}, 
        {"face":"card-4","life":20,"strength":30,"def":20}, 
        {"face":"card-5","life":50,"strength":60,"def":0}, 
        {"face":"card-6","life":20,"strength":30,"def":20}, 
        {"face":"card-7","life":70,"strength":20,"def":70}
    ]}`
    },
    "player": {
        "class": PlayerModel,
        "param": '{"cards":[]}'
    },
    "hand": {
        "class": HandModel,
        "param": '{"cards":[], "limit": 7}'
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