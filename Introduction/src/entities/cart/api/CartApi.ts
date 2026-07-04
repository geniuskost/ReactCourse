import type ICart from '../model/ICart';

export default class CartApi {
    /**
     * Перерахунок кошика: застосовує знижку за кількість (від 2 шт. — 10%)
     * та загальну знижку 5% на замовлення понад 1000.
     */
    static calculateCart(cart: ICart): Promise<ICart> {
        return new Promise<ICart>((resolve) => {
            setTimeout(() => {
                const newCart: ICart = { ...cart };
                newCart.price = 0;
                for (const ci of newCart.cartItems) {
                    if (ci.quantity <= 1) ci.price = ci.product.price;
                    else ci.price = ci.product.price * ci.quantity * 0.9;
                    newCart.price += ci.price;
                }
                if (newCart.price > 1000) {
                    newCart.price *= 0.95;
                    newCart.discount = '5%';
                } else {
                    newCart.discount = undefined;
                }
                resolve(newCart);
            }, 300);
        });
    }
}
