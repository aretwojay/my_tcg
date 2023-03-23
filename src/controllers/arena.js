import ModelFactory from '../models/factory';
import Pawn from '../models/pawn';

import Controller from './dom';

import SideController from './side';

var secondClick = false;

export default class ArenaController extends Controller {

    constructor() {
        super('body');

        this.up = new SideController(".side.opponent", this);
        this.down = new SideController(".side.player", this);

        this.game = ModelFactory.get('game', {
            'up': ModelFactory.get('player', { type: 'computer' }),
            'down': ModelFactory.get('player', { type: 'human' })
        });

        this.up.mHand.setState({ life: this.game["up"].life })
        this.down.mHand.setState({ life: this.game["down"].life })

        this.game["down"].deck.shuffle();
        this.game["up"].deck.shuffle();

        this.$dom.find('.life').html("PV " + this.game['up']['life']);

        this.on('clickDeck', this.onClickDeck.bind(this));
        this.on('clickHand', this.onClickHand.bind(this));
        this.on('clickBoard', this.onClickBoard.bind(this));
        this.on('targetHand', this.onTargetHand.bind(this));
        this.on('clickEndTurn', this.onClickEndTurn.bind(this));

    }

    onClickDeck(deck) {
        var s = deck.getSide();
        var self = this;
        var cardState = this.game[s].draw();
        if (cardState) {
            cardState.getSide = function () {
                return s;
            };
            self.trigger('drawCard', cardState);
        }

        if (self.game[s].deck.getCardsCount() === 0) {
            deck.getDom().addClass("empty");
        }
    }


    onClickHand(card) {
        // api call then
        var s = card.getSide();
        this.game[s].playCard(card.mState.position);
        this.trigger('playCard', card);
    }

    onClickBoard(card) {
        var self = this;
        console.log("game", self.game);
        console.log("card", card)
        var side = card.getSide() === "down" ? "up" : "down";
        console.log("side", side)
        if (!secondClick) {
            this.trigger('activateCard', card);
            secondClick = true;
        } else {
            console.log("card", card);
            let opponent = side === "down" ? "up" : "down";
            let activeCard = self[side].mBoard.mActiveCard;
            this.trigger('targetCard', card);
            let target = new Pawn(card.mState.life, card.mState.strength, card.mState.def)
            self.game[side].attack(activeCard.mState.position, target)
            console.log("active card", activeCard.mState)
            console.log("target card", target)
            //cap lifes to 0
            if (target.life <= 0) {
                target.life = 0;
            }
            if (activeCard.mState.life <= 0) {
                activeCard.mState.life = 0;
            }
            console.log(card);
            console.log("initial state", card.getState())
            //set state of active and target card
            card.setState(Object.assign({}, card.getState(), { life: target.life }));
            activeCard.setState(activeCard.mState);
            //discard target card if his life is equal or under 0
            if (card.mState.life <= 0) {
                card.getDom().addClass('cemetary');
                setTimeout(function () {
                    self.trigger('discardCard', card);
                    let cardCemetary = self.game[opponent].board.removeCard(card.mState.position);
                    self.game[opponent].cemetary.insertAt(cardCemetary);
                }, 4000);
            }
            //discard active card of current player if his life is equal or under 0
            if (activeCard.mState.life <= 0) {
                activeCard.getDom().addClass('cemetary');
                setTimeout(function () {
                    self.trigger('discardCard', activeCard);
                    let cardCemetary = self.game[side].board.removeCard(activeCard.mState.position);
                    self.game[side].cemetary.insertAt(cardCemetary);
                }, 4000);
            }
            secondClick = false;
        }
    }

    onTargetHand(hand) {
        console.log("hand", hand)
        console.log(self.game[hand.getSide()])
        if (secondClick) {
            this.trigger('attackHand', hand);
        }
    }

    onClickEndTurn() {
        var self = this;
        this.trigger('endTurn', { getSide: () => { return 'down' } });
        console.log('end turn');
        self.game.changeTurn();
        // self["up"].mDeck.getDom().trigger('click');

        // setTimeout(function () {
        //     self["up"].mHand.mCards[0].getDom().trigger('click');
        // }, 2000);

        // setTimeout(function () {
        //     if (self["down"].mBoard.mCards.length > 0) {
        //         self["up"].mBoard.mCards[0].getDom().trigger('click');
        //         self["down"].mBoard.mCards[0].getDom().trigger('click');
        //     }
        // }, 3000);

        setTimeout(function () {
            self.trigger('yourTurn', { getSide: () => { return 'down' } });
            console.log('your turn');
            self.game.changeTurn();
        }, 5000);
    }

}