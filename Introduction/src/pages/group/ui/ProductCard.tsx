import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type IProductBrief from '../../../entities/group/model/IProductBrief';
import AppContext from '../../../features/_context/AppContext';
import './ProductCard.css';

export default function ProductCard({ productBrief }: { productBrief: IProductBrief }) {
    const { cart, setCart } = useContext(AppContext);
    const navigate = useNavigate();

    const isInCart = Boolean(cart.cartItems.find((ci) => ci.product.id === productBrief.id));

    const addToCart = () => {
        setCart({
            ...cart,
            cartItems: [
                ...cart.cartItems,
                { product: productBrief, quantity: 1, price: productBrief.price },
            ],
        });
    };

    return (
        <div className="col">
            <div className="card h-100">
                <div
                    className="card-img-top bg-body d-flex justify-content-center p-3"
                    style={{ aspectRatio: 1.2, width: '100%' }}
                >
                    {productBrief.imageUrl && (
                        <img
                            src={productBrief.imageUrl}
                            className="card-img-top"
                            alt={productBrief.name}
                            style={{ maxHeight: '100%', width: 'auto' }}
                        />
                    )}
                </div>
                <div className="card-body">
                    {/* Д.З.: назва — максимум 2 рядки, опис — максимум 3 рядки, далі "..." */}
                    <h5 className="card-title product-card__title">{productBrief.name}</h5>
                    <p className="card-text product-card__description">{productBrief.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <div>
                        {productBrief.actionPrice ? (
                            <div>
                                <div className="strike-price">₴ {productBrief.price.toFixed(2)}</div>
                                <b>₴ {productBrief.actionPrice.toFixed(2)}</b>
                            </div>
                        ) : (
                            <b>₴ {productBrief.price.toFixed(2)}</b>
                        )}
                    </div>

                    {isInCart ? (
                        <button className="btn btn-success" onClick={() => navigate('/cart')} aria-label="У кошику">
                            <i className="bi bi-cart-check"></i>
                        </button>
                    ) : (
                        <button className="btn btn-outline-success" onClick={addToCart} aria-label="Додати в кошик">
                            <i className="bi bi-cart-plus"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
