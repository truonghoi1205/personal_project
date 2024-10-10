import LogoBrand from "../LogoBrand";
import "../../style/scss/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../Redux/product/productSlice";
import Helper from "../../utils/Helper";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    console.log(products)

    return (
        <div>
            <LogoBrand />
            <div className="container mb-5">
                <div className="text-center">
                    <h3>Top sản phẩm</h3>
                </div>
                <div className="row mt-5">
                    {products.map((p, index) => (
                        <div className="col-3" key={index}>
                            <Link to="/">
                                <div className="product-card">
                                    <img
                                        className="product-card__img"
                                        src="/image/2__4__4947cad89d1248cc8b2027ae87f0e240_1024x1024.webp"
                                        alt="Product"
                                    />
                                    <div className="product-card__info">
                                        <span className="product-card__brand-name">{p.brand.name}</span>
                                    </div>
                                    <div className="product-card__name">
                                        <small>{p.name} {Helper.getAbbreviation(p.concentration)}</small>
                                    </div>
                                    <div className="product-card__price">
                                        {p.productDetails[0]?.price}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
