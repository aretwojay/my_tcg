import ModelFactory from '../models/factory';

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

        this.$dom.find('.life').html("PV " + this.game['up']['life']);

        this.on('clickDeck', this.onClickDeck.bind(this));
        this.on('clickHand', this.onClickHand.bind(this));
        this.on('clickBoard', this.onClickBoard.bind(this));
        this.on('targetHand', this.onTargetHand.bind(this));
        this.on('clickEndTurn', this.onClickEndTurn.bind(this));

    }

    onClickDeck(deck) {
        var s = deck.getSide();
        console.log(s);
        var self = this;
        var cardState = this.game[s].draw();
        if (!cardState) {
            return deck.getDom().addClass("empty")
        }
        cardState.getSide = function () {
            return s;
        };
        self.trigger('drawCard', cardState);
        console.log(self.game[s])
        // if (self.game[s].deck.getCardsCount() === 0) {
        //     self.trigger('emptyDeck');
        // }
    }


    onClickHand(card) {
        // api call then
        this.trigger('playCard', card);
    }

    onClickBoard(card) {
        var self = this;
        var side = self.game.getTurn();
        if (!secondClick) {
            this.trigger('activateCard', card);
            secondClick = true;
        } else {
            console.log("attacking")
            this.trigger('targetCard', card);
            console.log(self.game[side].attack(self[side].mBoard.mActiveCard.mState.position, self[side].mBoard.mActiveCard.mState))
            console.log(self.game.up)
            setTimeout(function () {
                self.trigger('discardCard', card);
            }, 4000);
            secondClick = false;
        }
    }

    onTargetHand(hand) {
        if (secondClick) {
            this.trigger('attackHand', hand);
        }
    }

    onClickEndTurn() {
        var self = this;
        this.trigger('endTurn', { getSide: () => { return 'down' } });
        console.log('end turn');
        self.game.changeTurn();

        setTimeout(function () {
            self.trigger('yourTurn', { getSide: () => { return 'down' } });
            console.log('your turn');
            self.game.changeTurn();
        }, 5000);
    }

}