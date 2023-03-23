import Deck from "../src/models/deck";
import Game from "../src/models/game"
import Player from "../src/models/player";
import config from '../src/models/config.js';
import ModelFactory from '../src/models/factory';

describe("Class Game", () => {
    describe("constructor(object config):", () => {
        let player1 = new Player();
        let player2 = new Player();
        let game = new Game({ up: player1, down: player2 })
        it("get 'up' and 'down' properties from config, which are Player instances", () => {
            expect(game.up).toEqual(jasmine.any(Player));
            expect(game.down).toEqual(jasmine.any(Player));
        });
    });
    describe("string getTurn():", () => {
        let player1 = new Player();
        let player2 = new Player();
        let game = new Game({ up: player1, down: player2 })
        it("return actual turn", () => {
            expect(game.getTurn()).toEqual("down");
        });
    });
    describe("string changeTurn():", () => {
        let player1 = new Player();
        let player2 = new Player();
        let game = new Game({ up: player1, down: player2 })
        it("return actual turn", () => {
            expect(game.changeTurn()).toEqual("up");
        });
    });
    describe("bool proxy(string side, string action, mixed payload):", () => {
        let player1 = new Player();
        let player2 = new Player();
        let game = new Game({ up: player1, down: player2 })
        it("start method based on action and payload parameter with the proper side player", () => {
            expect(game.proxy("up", "draw")).toEqual({ "face": "card-1", "life": 30, "strength": 20, "def": 20 });
            expect(game.proxy("up", "playCard", 0)).toBe(true);
            expect(game.proxy("up", "playCard")).toBe(false);
        });
    });

})