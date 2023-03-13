import EventManager from "../eventManager";

export default class Pawn extends EventManager {

    constructor(life, strength, def) {
        super()
        this.life = life;
        this.strength = strength;
        this.def = def;
    }

    get getLife() {
        return this.life;
    }

    get getStrength() {
        return this.strength;
    }

    get getDef() {
        return this.def;
    }

    attack(target) {
        if (target instanceof Pawn) {
            target.receiveAttack(this);
            return true;
        }
        return false;
    }

    receiveAttack(opponent, strikeBack = false) {
        if (strikeBack) {
            return this.life -= opponent.def;
        }
        this.life -= opponent.strength;
        return opponent.receiveAttack(this, true)

    }

}