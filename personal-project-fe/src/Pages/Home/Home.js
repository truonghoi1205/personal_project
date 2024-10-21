import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts, resetProducts } from "../../Redux/product/productSlice";
import LogoBrand from "../LogoBrand";
import "../../style/scss/Home.scss";
import Helper from "../../utils/Helper";
import Lottie from "lottie-react";
import empty from '../../LottieData/empty.json'
import AboutTab1 from "../AboutTab1";
import AboutTab2 from "../AboutTab2";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    useEffect(() => {
        dispatch(resetProducts());
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <LogoBrand />
            <div className="container mb-5">
                <div className="text-center">
                    <h3>Top sản phẩm</h3>
                </div>
                <div className="row mt-5">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((p, index) => (
                            <div className="col-3" key={index}>
                                <Link to={`/san-pham/${p.slug}`}>
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
                        ))
                    ) : (
                        <Lottie animationData={empty}/>
                    )}
                </div>
            </div>
            <AboutTab1/>
            <AboutTab2/>
        </div>
    );
}

export default Home;
