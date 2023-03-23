import ModelFactory from './factory';
import Pawn from './pawn';
export default class Player extends Pawn {

    constructor(config) {
        super(100, 0, 0);

        this.deck = ModelFactory.get("deck");
        this.cemetary = ModelFactory.get("cemetary");
        this.board = ModelFactory.get("board");
        this.hand = ModelFactory.get("hand");
    }

    shuffle(type = "deck") {
        if (type === "deck") {
            return this.deck.shuffle();
        }
        else if (type === "cemetary") {
            return this.cemetary.shuffle();
        }
        return false;
    }

    draw() {
        let card = this.deck.draw();
        if (this.hand.addCard(card)) {
            return card;
        }
        return false;
    }

    playCard(position) {
        let card = this.hand.removeCard(position);
        if (card) {
            return this.board.addCard(card);
        }
        return false;
    }

    discard(position) {
        return this.cemetary.insertAt(this.hand.removeCard(position));
    }

    attack(position, target) {
        let card = this.board.cards[position];
        console.log("position", position)
        console.log("card", card)
        if (target instanceof Pawn && card.life && card.strength && card.def) {
            let pawn = new Pawn(card.life, card.strength, card.def);
            if (pawn.attack(target)) {
                console.log("attacker life", pawn.life);
                card.life = pawn.life;
                return true;
            }
        }
        return false;
    }

}