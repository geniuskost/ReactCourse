import type ICartItem from './ICartItem';

export default interface ICart {
    cartItems: ICartItem[]; // товари у кошику
    price: number; // ціна замовлення з урахуванням знижок
    delivery?: number; // вартість доставки
    discount?: string; // повідомлення про знижку, як-то "-20%" або "-250 грн"
}
