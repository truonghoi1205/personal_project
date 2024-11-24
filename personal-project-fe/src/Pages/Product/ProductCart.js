import {NavLink} from "react-router-dom";
import Helper from "../../utils/Helper";

const ProductCard = ({ product }) => (
    <div className="col mb-3">
        <NavLink to={`/product/${product.slug}`} className="text-decoration-none">
            <div className="d-flex flex-column align-items-center p-3 h-100" style={{ width: "200px" }}>
                <img
                    className="product-card__img mb-3"
                    src={product.images[0]?.url}
                    alt="Product"
                    style={{ height: "130px", objectFit: "cover", borderRadius: "8px" }}
                />
                <div className="text-black-50 mb-1">
                    <small>{product.brand.name}</small>
                </div>
                <div className="text-black text-center mb-2">
                    <span>
                        {product.name} {Helper.getAbbreviation(product.concentration)}
                    </span>
                </div>
                <div className="product-card__price">
                    <span>{Helper.formatPrice(product.productDetails[0]?.price)}</span>
                </div>
            </div>
        </NavLink>
    </div>
);

export default ProductCard;
