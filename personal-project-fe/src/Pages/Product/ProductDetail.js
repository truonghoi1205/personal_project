import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../Redux/product/productSlice";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Helper from "../../utils/Helper";

function ProductDetail() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productDetail, status } = useSelector((state) => state.products);
    const { token } = useSelector((state) => state.auth);
    const [quantity, setQuantity] = useState(1);
    const [selectedVolume, setSelectedVolume] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(fetchProductDetail(slug));
    }, [dispatch, slug]);

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change));
    };

    const handleVolumeChange = (volume) => {
        setSelectedVolume(volume);
        setError(''); // Reset error message when volume is selected
    };

    const getPrice = () => {
        const detail = productDetail.productDetails.find(
            (item) => item.volume === selectedVolume
        );
        return detail ? Helper.formatPrice(detail.price) : "";
    };

    const handleAddToCart = () => {
        if (!selectedVolume) {
            setError('Vui lòng chọn dung tích.');
            return;
        }
        if (!token) {
            navigate("/login");
        }
    };

    const handleBuyNow = () => {
        if (!selectedVolume) {
            setError('Vui lòng chọn dung tích.');
            return;
        }
        if (!token) {
            navigate("/login");
        }
    };

    if (status === "loading") {
        return <div className="text-center py-5">...Loading</div>;
    }

    return (
        productDetail ? (
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-6">
                        <img
                            src={
                                productDetail.imageUrl ||
                                "https://xxivstore.com/wp-content/uploads/2020/06/3348901486392_672fa1db2d985714658c181fc5f0ac72-768x768.png"
                            }
                            alt={productDetail.name}
                            className="w-50 d-flex m-auto"
                        />
                    </div>
                    <div className="col-6">
                        <h3 className="fw-bold">{productDetail.brand.name}</h3>
                        <h2 className="fs-2 fw-light text-muted">
                            {productDetail.name} {productDetail.concentration}
                        </h2>
                        <div className="mb-2">
                            <span className="badge bg-secondary">{productDetail.category.name}</span>
                        </div>
                        <h4 className="mt-3">Chọn dung tích:</h4>
                        <div className="d-flex gap-2">
                            {productDetail.productDetails.map((detail) => (
                                <button
                                    key={detail.volume}
                                    className={`btn ${
                                        selectedVolume === detail.volume
                                            ? "btn-secondary"
                                            : "btn-outline-secondary"
                                    }`}
                                    onClick={() => handleVolumeChange(detail.volume)}
                                >
                                    {detail.volume}ml
                                </button>
                            ))}
                        </div>
                        {error && <div className="text-danger mt-2">{error}</div>}
                        <p className="fs-3 text-dark mt-3">{getPrice()}</p>
                        <div className="d-flex align-items-center mt-3">
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleQuantityChange(-1)}
                            >
                                -
                            </button>
                            <span className="mx-3 fs-5">{quantity}</span>
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleQuantityChange(1)}
                            >
                                +
                            </button>
                        </div>
                        <div className="mt-4">
                            <button
                                className="btn btn-outline-dark py-2 px-3 me-2"
                                onClick={handleAddToCart}
                            >
                                Thêm vào giỏ hàng <i className="bi bi-cart-plus"></i>
                            </button>
                            <button
                                className="btn btn-danger py-2"
                                onClick={handleBuyNow}
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product-description mt-5 col-7">
                    <h5>Mô tả</h5>
                    <div>{parse(productDetail.description)}</div>
                </div>
            </div>
        ) : (
            <div className="text-center py-5">
                <p className="fs-4">Không tìm thấy sản phẩm</p>
            </div>
        )
    );
}

export default ProductDetail;
