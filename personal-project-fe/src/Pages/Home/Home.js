import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import LogoBrand from "../LogoBrand";
import "../../style/scss/Home.scss";
import Helper from "../../utils/Helper";
import Lottie from "lottie-react";
import empty from '../../LottieData/empty.json'
import AboutTab1 from "../AboutTab1";
import AboutTab2 from "../AboutTab2";
import {useEffect} from "react";
import {fetchProducts} from "../../Redux/product/productSlice";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <LogoBrand/>
            <div className="container mb-5">
                <div className="text-center">
                    <h3>Top sản phẩm</h3>
                </div>
                <div className="row mt-5">
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((p, index) => (
                            <div className="col-2" key={index}>
                                <div className="product-card">
                                    <Link to={`/product/${p.slug}`}>
                                        <img
                                            className="product-card__img"
                                            src={p.images[0]?.url}
                                            alt="Product"
                                        />
                                    </Link>
                                    <Link to={`/products/brand/${p.brand.name}`} onClick={scrollToTop}>
                                        <div className="product-card__info">
                                            <span className="product-card__brand-name">{p.brand.name}</span>
                                        </div>
                                    </Link>
                                    <Link to={`/product/${p.slug}`}>
                                        <div className="product-card__name">
                                        <small>{p.name} {Helper.getAbbreviation(p.concentration)}</small>
                                        </div>
                                    </Link>
                                    <div className="product-card__price">
                                        <p className="mb-2">{Helper.formatPrice(p.productDetails[0]?.price)}</p>
                                    </div>
                                    <div>
                                        <small>{p.productDetails.length} Sizes</small>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Lottie animationData={empty}/>
                    )}
                </div>
                <div>
                    <button>Xem thêm</button>
                </div>
            </div>
            <AboutTab1/>
            <AboutTab2/>
        </div>
    );
}

export default Home;
