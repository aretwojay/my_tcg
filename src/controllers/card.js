import Controller from './dom';

export default class CardController extends Controller {

    constructor(parent) {
        super('<div></div>', parent);

        this.$dom.append('<div></div>').find('div:first-child').addClass('card-front').html(`<div class='stats'></div>`);
        this.$dom.append('<div></div>').find('div:last-child').addClass('card-back');

        this.$dom.addClass('card');

        this.$dom.hover(this.onOver.bind(this), this.onOut.bind(this));
        this.$dom.on("click", this.onClick.bind(this));

        this.$dom.appendTo(parent.getDom());
    }

    setState(state) {
        super.setState(state);
        console.log(state)
        this.$dom.find('div:first-child').addClass(state.face);
        this.$dom.find('.stats:first-child').html(`PV ${state.life} STR ${state.strength} DEF ${state.def}`);

    }

    setParent(parent) {
        super.setParent(parent);
    }

    onOver() {
        if (this.$dom.hasClass('hand')) {
            var top = this.getSide() === "down" ?
                this.root.getDom().height() / 2 - 70 - 30 :
                -70 + 30;
            this.$dom.css('top', top);
        }
    }

    onOut() {
        if (this.$dom.hasClass('hand')) {
            var top = this.getSide() === "down" ?
                this.root.getDom().height() / 2 - 70 :
                -70;
            this.$dom.css('top', top);
        }
    }

    onClick() {
        this.parent.trigger('clickCard', this);
    }

}