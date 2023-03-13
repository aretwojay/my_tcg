import Deck from '../src/models/deck.js';
import config from '../src/models/config.js';
import ModelFactory from '../src/models/factory';

let deck = ModelFactory.get("deck");
describe("Class Deck", () => {

    describe("constructor(object config):", () => {
        it("get array 'cards' from object", () => {
            expect(deck.cards).toEqual(jasmine.any(Array));
        });
    });
    describe("bool shuffle()", () => {
        let deck = ModelFactory.get("deck");
        let defaultCards = JSON.parse(config.deck.param).cards;

        if (deck.shuffle()) {
            it("shuffle array 'cards' and return true", () => {
                expect(deck.cards).not.toEqual(defaultCards);
            });
        }
        else {
            it("should not shuffle array 'cards' and return false", () => {
                expect(deck.cards).toEqual(defaultCards);
            });
        }
    })
    describe("bool insertAt(mixed card, [int position]):", () => {
        let deck = ModelFactory.get("deck");
        let defaultCards = JSON.parse(config.deck.param).cards;

        it("if n given, add card to a given n position in 'cards'", () => {
            deck.insertAt({ "face": "card-2" }, 2)
            defaultCards.splice(2, 0, { "face": "card-2" })
            console.log(JSON.stringify(defaultCards), JSON.stringify(deck.cards))
            expect(deck.cards).toEqual(defaultCards);
        });

        it("if n not given, add card to end of 'cards'", () => {
            deck.insertAt({ "face": "card-2" })
            expect(deck.cards).toEqual(defaultCards.concat([{ "face": "card-2" }]));
        });
    })

    describe("mixed draw():", () => {
        let deck = ModelFactory.get("deck");
        let defaultCards = JSON.parse(config.deck.param).cards;

        it("return and remove first element from cards", () => {
            expect(deck.draw()).toEqual(defaultCards[0]);
        });
        it("if no cards is in the deck, return false", () => {
            let deck = new Deck({ cards: [] });
            expect(deck.draw()).toBe(false);
        });
    })

    describe("int getCardsCount():", () => {
        let defaultCards = JSON.parse(config.deck.param).cards;
        it("return length of 'cards' ", () => {
            expect(deck.getCardsCount()).toEqual(defaultCards.length);
        });
    })
})
