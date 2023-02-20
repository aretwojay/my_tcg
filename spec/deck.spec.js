import Deck from '../src/models/deck.js';

describe("Class Deck", () => {
    describe("constructor(object config)", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        it("get array 'cards' from object", () => {
            expect(deck.cards).toEqual(jasmine.any(Array));
        });
    });
    describe("bool shuffle()", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        if (deck.shuffle()) {
            it("shuffle array 'cards' and return true", () => {
                expect(deck.cards).not.toEqual(["a", "b", "c", "d"]);
            });
        }
        else {
            it("should not shuffle array 'cards' and return false", () => {
                expect(deck.cards).toEqual(["a", "b", "c", "d"]);
            });
        }
    })
    describe("bool insertAt(mixed card, [int position]):", () => {
        it("if n given, add card to a given n position in 'cards'", () => {
            let deck = new Deck({ cards: ["a", "b", "c", "d"] });
            deck.insertAt("card", 2)
            expect(deck.cards).toEqual(["a", "b", "card", "c", "d"]);
        });

        it("if n not given, add card to end of 'cards'", () => {
            let deck = new Deck({ cards: ["a", "b", "c", "d"] });
            deck.insertAt("card")
            expect(deck.cards).toEqual(["a", "b", "c", "d", "card"]);
        });


    })

    describe("mixed draw():", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        it("return and remove first element from cards", () => {
            expect(deck.draw()).toEqual("a");
            expect(deck.cards).toEqual(["b", "c", "d"]);
        });
    })

    describe("int getCardsCount():", () => {
        let deck = new Deck({ cards: ["a", "b", "c", "d"] });
        it("return length of 'cards' ", () => {
            expect(deck.getCardsCount()).toEqual(4);
        });
    })
})
