import EventManager from "../eventManager";

export default class Game extends EventManager {
    constructor(config) {
        super();
        this.turn = "down";
        this.up = config.up;
        this.down = config.down;
    }

    getTurn() {
        return this.turn;
    }

    changeTurn() {
        if (this.turn === "up") {
            return this.turn = "down";
        }
        else if (this.turn === "down") {
            return this.turn = "up";
        }
    }

    proxy(side, action, payload = null) {
        if (typeof action != "string" || (payload && typeof payload != "string")) {
            return false;
        }
        if (side === "up" || side === "down") {
            return this[side][action](payload);
        }

    }
}