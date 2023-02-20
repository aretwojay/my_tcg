
export default class Deck {
    constructor(config) {
        this.cards = config.cards;
    }

    shuffle() {
        let j, x, index;
        let initalCards = this.cards.join(",");
        for (index = this.cards.length - 1; index > 0; index--) {
            j = Math.floor(Math.random() * (index + 1));
            x = this.cards[index];
            this.cards[index] = this.cards[j];
            this.cards[j] = x;
        }
        if (initalCards !== this.cards.join(","))
            return true;
        return false;
    }

    insertAt(card, position = null) {
        if (position === null) {
            return !!this.cards.push(card);
        }
        return !!this.cards.splice(position, 0, card)
    }

    draw() {
        return this.cards.shift();
    }

    getCardsCount() {
        return this.cards.length;
    }
}