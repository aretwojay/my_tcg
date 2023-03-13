import Pawn from "../src/models/pawn"

describe("Class Pawn", () => {
    describe("constructor(int life, int strength, int def):", () => {
        it("takes 3 numbers from parameters", () => {
            let pawn = new Pawn(100, 50, 50);
            expect(pawn.life).toEqual(jasmine.any(Number));
            expect(pawn.strength).toEqual(jasmine.any(Number));
            expect(pawn.def).toEqual(jasmine.any(Number));
        });
    })

    describe("int getLife(int life):", () => {
        it("return life property", () => {
            let pawn = new Pawn(100, 50, 50);
            expect(pawn.getLife).toEqual(pawn.life);
        });
    })

    describe("int getStrength(int strength):", () => {
        it("return strength property", () => {
            let pawn = new Pawn(100, 50, 50);
            expect(pawn.getStrength).toEqual(pawn.strength);
        });
    })

    describe("int getDef(int def):", () => {
        it("return def property", () => {
            let pawn = new Pawn(100, 50, 20);
            expect(pawn.getDef).toEqual(pawn.def);
        });
    })

    describe("bool attack(Pawn target):", () => {
        it("takes an instance of Pawn from parameters", () => {
            let pawn = new Pawn(100, 50, 50);
            let opponent = new Pawn(100, 50, 50);
            expect(pawn.attack(opponent)).toBeTruthy();
        });
    })

    describe("bool receiveAttack(Pawn opponent, bool strikeBack = false):", () => {
        it("current pawn get his life reduced by opponent's def, opponent get his life reduced by pawn's strength", () => {
            let pawn = new Pawn(100, 50, 15);
            let opponent = new Pawn(100, 20, 10);
            pawn.attack(opponent)
            expect(opponent.life).toBe(100 - pawn.strength);
            expect(pawn.life).toBe(100 - opponent.def);
        });
    })

})