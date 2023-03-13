import Hand from '../src/models/hand.js';
import config from '../src/models/config.js';
import ModelFactory from '../src/models/factory';

let hand = ModelFactory.get("hand", defaultCards);
let defaultCards = JSON.parse(config.deck.param).cards;
describe("Class Hand", () => {
    describe("constructor(object config):", () => {
        it("get array 'cards' from object without limit", () => {
            expect(hand.cards).toEqual(jasmine.any(Array));
        });
        it("get array 'cards' from object with a limit", () => {
            let hand = new Hand({ cards: [{ "face": "card-2" }, { "face": "card-1" }], limit: 10 });
            expect(hand.cards).toEqual(jasmine.any(Array));
            expect(hand.limit).toEqual(jasmine.any(Number));
        });
    });
    describe("bool addCard(object card):", () => {
        it("add a card to hand", () => {
            let hand = ModelFactory.get("hand", defaultCards);
            let defaultCards = JSON.parse(config.deck.param).cards;
            expect(hand.addCard({ "face": "card-2" })).toBe(true);
            expect(hand.cards.pop()).toEqual({ "face": "card-2" });
        });
        it("if limit is reached, hand still the same", () => {
            let hand = new Hand({ cards: [{ "face": "card-2" }, { "face": "card-1" }], limit: 2 });
            expect(hand.addCard({ "face": "card-2" })).toBe(false);
            expect(hand.cards.pop()).toEqual({ "face": "card-1" });
        });
    });
    describe("bool removeCard(object card):", () => {
        it("remove a card to hand", () => {
            let hand = new Hand({ cards: [{ "face": "card-2" }, { "face": "card-1" }], limit: 2 });
            expect(hand.removeCard(0)).toEqual({ "face": "card-2" });
        });
        it("if no cards in deck, return false", () => {
            expect(hand.removeCard(1)).toBe(false);
        });
    });
    describe("array getAllCards():", () => {
        it("return array of cards in the hand", () => {
            let hand = new Hand({ cards: [{ "face": "card-2" }, { "face": "card-1" }], });
            expect(hand.getAllCards()).toEqual([{ "face": "card-2" }, { "face": "card-1" }]);
        });
    });
    describe("int getCardsCount():", () => {
        it("return number of cards in the hand", () => {
            let cards = ["a", "b", "c", "d"];
            let hand = new Hand({ cards });
            expect(hand.getCardsCount()).toEqual(cards.length);
        });
    });
})
