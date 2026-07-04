import type IProductBrief from '../../../entities/group/model/IProductBrief';
import './ProductCard.css';

export default function ProductCard({ productBrief }: { productBrief: IProductBrief }) {
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
                <div className="card-footer">
                    {productBrief.actionPrice ? (
                        <div>
                            <div className="strike-price">₴ {productBrief.price.toFixed(2)}</div>
                            <b>₴ {productBrief.actionPrice.toFixed(2)}</b>
                        </div>
                    ) : (
                        <b>₴ {productBrief.price.toFixed(2)}</b>
                    )}
                </div>
            </div>
        </div>
    );
}
