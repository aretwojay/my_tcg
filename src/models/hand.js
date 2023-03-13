export default class Hand {
    constructor(config) {
        this.cards = config.cards;
        this.limit = config.limit ? Number(config.limit) : 7;
    }

    addCard(card) {
        if (this.cards.length < this.limit)
            return !!this.cards.push(card);
        return false;
    }

    removeCard(index) {
        if (!this.cards.length) {
            return false;
        }
        return this.cards.splice(index, 1)[0];
    }

    getAllCards() {
        return this.cards;
    }
    getCardsCount() {
        return this.cards.length;
    }
}