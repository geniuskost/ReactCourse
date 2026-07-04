import type IProductBrief from '../../group/model/IProductBrief';

export default interface ICartItem {
    product: IProductBrief;
    quantity: number;
    price: number; // підсумкова ціна позиції з урахуванням знижок
}
