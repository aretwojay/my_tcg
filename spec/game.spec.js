import Deck from "../src/models/deck";
import Game from "../src/models/game"
import Player from "../src/models/player";
import config from '../src/models/config.js';
import ModelFactory from '../src/models/factory';

let game = ModelFactory.get("game");

describe("Class Game", () => {
    describe("constructor(object config):", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        let player1 = new Player({ deck });
        let player2 = new Player({ deck });
        let game = new Game({ up: player1, down: player2 })
        it("get 'up' and 'down' properties from config, which are Player instances", () => {
            expect(game.up).toEqual(jasmine.any(Player));
            expect(game.down).toEqual(jasmine.any(Player));
        });
    });
    describe("string getTurn():", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        let player1 = new Player({ deck });
        let player2 = new Player({ deck });
        let game = new Game({ up: player1, down: player2 })
        it("return actual turn", () => {
            expect(game.getTurn()).toEqual("up");
        });
    });
    describe("string changeTurn():", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        let player1 = new Player({ deck });
        let player2 = new Player({ deck });
        let game = new Game({ up: player1, down: player2 })
        it("return actual turn", () => {
            expect(game.changeTurn()).toEqual("down");
        });
    });
    describe("bool proxy(string side, string action, mixed payload):", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        let player1 = new Player({ deck });
        let player2 = new Player({ deck });
        let game = new Game({ up: player1, down: player2 })
        it("start method based on action and payload parameter with the proper side player", () => {
            expect(game.proxy("up", "draw")).toEqual({ "face": "card-1" });
            expect(game.proxy("up", "playCard", 0)).toBe(true);
            expect(game.proxy("up", "playCard")).toBe(false);
        });
    });

})