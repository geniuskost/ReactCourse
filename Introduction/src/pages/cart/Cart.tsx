import { useContext } from 'react';
import './ui/Cart.css';
import AppContext from '../../features/_context/AppContext';
import Counter from '../../widgets/counter/Counter';
import type ICartItem from '../../entities/cart/model/ICartItem';

export default function Cart() {
    const { cart } = useContext(AppContext);

    // Сума цін позицій без знижок та підсумкова вигода по кошику.
    const fullSum = cart.cartItems.reduce((acc, ci) => acc + ci.product.price * ci.quantity, 0);
    const benefit = fullSum - cart.price;

    return (
        <div className="row mx-3">
            <div className="col col-12 col-lg-8">
                <h1>Кошик</h1>
                {cart.cartItems.length === 0 ? (
                    <p>Кошик порожній</p>
                ) : (
                    cart.cartItems.map((ci) => <CartItemView key={ci.product.id} ci={ci} />)
                )}
            </div>

            <div className="col col-12 col-lg-4">
                <div className="mt-2 bg-light border p-0">
                    <h3 className="bg-body-tertiary border-bottom py-2 text-center">Разом</h3>
                    <div className="d-flex justify-content-between mx-2 mb-2">
                        <span>Проміжна сума</span>
                        <b>₴ {cart.cartItems.reduce((acc, x) => acc + x.price, 0).pad2()}</b>
                    </div>
                    {cart.discount && (
                        <div className="d-flex justify-content-between mx-2 mb-2 text-success">
                            <span>Знижка</span>
                            <b>-{cart.discount}</b>
                        </div>
                    )}
                    <div className="d-flex justify-content-between px-2 mb-1 border-top py-2">
                        <span>До сплати</span>
                        {/* Д.З.: якщо загальна ціна кошика менша за суму цін позицій —
                            показати елемент вигоди (-₴X) над повною сумою */}
                        {cart.price < fullSum ? (
                            <span className="cart-benefit">
                                <span className="cart-benefit__save">-₴{benefit.pad2()}</span>
                                <span className="cart-benefit__full">₴ {fullSum.pad2()}</span>
                                <b>₴ {cart.price.pad2()}</b>
                            </span>
                        ) : (
                            <b>₴ {cart.price.pad2()}</b>
                        )}
                    </div>
                </div>
                <button className="btn btn-success w-100 mt-2">Оформити замовлення</button>
            </div>
        </div>
    );
}

function CartItemView({ ci }: { ci: ICartItem }) {
    const { cart, setCart } = useContext(AppContext);

    const onQuantityChange = (quantity: number) => {
        if (quantity > 0) {
            ci.quantity = quantity;
            // ci — посилання на об'єкт усередині кошика; для реакції React
            // потрібен новий об'єкт стану.
            setCart({ ...cart });
        } else {
            // Д.З.: видалення позиції при зменшенні кількості до 0
            // з попереднім підтвердженням користувача.
            if (confirm(`Видалити «${ci.product.name}» з кошика?`)) {
                setCart({
                    ...cart,
                    cartItems: cart.cartItems.filter((x) => x.product.id !== ci.product.id),
                });
            }
        }
    };

    const fullPrice = ci.product.price * ci.quantity;

    return (
        <div className="row mb-3 align-items-center">
            <div className="col col-2">
                <img src={ci.product.imageUrl} className="w-100" alt={ci.product.name} />
            </div>
            <div className="col col-5 col-sm-3">{ci.product.name}</div>
            <div className="col col-1 col-sm-2 text-center">₴ {ci.product.price.pad2()}</div>
            <div className="col col-3 text-center">
                <Counter initialQuantity={ci.quantity} onChange={onQuantityChange} showDoNotCall={false} />
            </div>
            <div className="col col-1 col-sm-2 text-center">
                <span className="position-relative">
                    ₴ {ci.price.pad2()}
                    {ci.price < fullPrice && (
                        <span className="strike-ci-price">₴ {fullPrice.pad2()}</span>
                    )}
                </span>
            </div>
        </div>
    );
}
