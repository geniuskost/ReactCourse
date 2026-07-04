// Розширення типу Number: форматування ціни у два знаки після коми.
export {};

declare global {
    interface Number {
        pad2: () => string;
    }
}

Number.prototype.pad2 = function (): string {
    return this.valueOf().toFixed(2);
};
