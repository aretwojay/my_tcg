import Deck from "../src/models/deck";
import Pawn from "../src/models/pawn";
import Player from "../src/models/player";
import config from '../src/models/config.js';
import ModelFactory from '../src/models/factory';

let defaultCards = JSON.parse(config.deck.param).cards;
describe("Class Player", () => {
    describe("constructor(object config):", () => {
        it("takes Deck from parameter", () => {
            let player = new Player()
            let isArray = typeof player.deck === "array";
            let isDeck = player.deck instanceof Deck;
            expect(isArray || isDeck).toBe(true);
        });
    })
    describe("bool shuffle(string type = “deck”):", () => {
        let player = new Player();
        if (player.shuffle()) {
            it("shuffle array 'cards' and return true", () => {
                expect(player.deck.cards).not.toEqual(defaultCards);
            });
        }
        else {
            it("should not shuffle array 'cards' and return false", () => {
                expect(player.deck.cards).toEqual(defaultCards);
            });
        }
        it("if type != 'deck' or 'cemetary', return false", () => {
            let player = new Player();
            expect(player.shuffle("hello")).toBe(false);
        });
    })
    describe("bool draw():", () => {
        it("return first card of deck", () => {
            let player = new Player()
            expect(player.draw()).toEqual({ "face": "card-1", "life": 30, "strength": 30, "def": 50 });
        });
        it("if no cards in the deck, return false", () => {
            let player = new Player();
            for (let i = 0; i <= 7; i++) {
                player.draw();
            }
            expect(player.draw()).toBe(false);
        });
    })
    describe("bool playCard(int position):", () => {
        it("remove card in n index and add this card into the board and return true", () => {
            let player = new Player();
            player.draw();
            player.playCard(0);
            expect(player.board.cards[0]).toEqual({ "face": "card-1", "life": 30, "strength": 30, "def": 50 });;
        });
    })
    describe("bool discard(int position):", () => {
        it("remove card in n index and add this card into the cemetary and return true", () => {
            let deck = ModelFactory.get("deck");
            let player = new Player({ deck });
            player.draw();
            player.discard();
            expect(player.cemetary.cards[0]).toEqual({ "face": "card-1", "life": 30, "strength": 30, "def": 50 });
        });
    })
    describe("bool attack(int position, Pawn target):", () => {
        it("launch attack with board's card of specific target", () => {
            let deck = ModelFactory.get("deck");
            let player1 = new Player({ deck });
            let player2 = new Player({ deck });
            let target = new Pawn(100, 20, 80);
            player1.draw();
            player1.playCard(0);
            player1.attack(0, player2)
            expect(player2.life).toEqual(70);
        });
    })
})