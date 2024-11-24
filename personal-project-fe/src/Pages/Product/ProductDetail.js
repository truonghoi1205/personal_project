import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductDetail} from "../../Redux/product/productSlice";
import {useEffect, useState} from "react";
import parse from "html-react-parser";
import Helper from "../../utils/Helper";
import AddToCart from "../Cart/AddToCard";
import ProductImage from "./ProductImage";

function ProductDetail() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {productDetail, status} = useSelector((state) => state.products);
    const {token} = useSelector((state) => state.auth);
    const [quantity, setQuantity] = useState(1);
    const [selectedVolume, setSelectedVolume] = useState(null);
    const [error, setError] = useState('');
    const detail = productDetail?.productDetails?.find((item) => item.volume === selectedVolume);
    const sortedProductDetails = productDetail ? Helper.sortProductDetailsByVolume(productDetail.productDetails) : [];

    useEffect(() => {
        if (slug) {
            dispatch(fetchProductDetail(slug));
        }
    }, [dispatch, slug]);

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change));
    };

    const handleVolumeChange = (volume) => {
        const volumeDetail = productDetail.productDetails.find(item => item.volume === volume);
        setSelectedVolume(volume); // Always set selected volume
        if (volumeDetail && volumeDetail.stock <= 0) {
            setError('Tạm hết hàng!');
        } else {
            setError('');
        }
    };

    const getPrice = () => {
        return detail ? Helper.formatPrice(detail.price) : "";
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

    if (!productDetail) {
        return (
            <div className="text-center py-5">
                <p className="fs-4">Không tìm thấy sản phẩm</p>
            </div>
        );
    }
    return (
        <div className="container my-5">
            <div className="row">
                <div className=" col-6">
                    <ProductImage images={productDetail.images}/>
                </div>
                <div className="col-6">
                    <h3 className="fw-bold">{productDetail.brand.name}</h3>
                    <h4 className="fw-light text-muted">
                        {productDetail.name} {productDetail.concentration}
                    </h4>
                    <div className="mb-2">
                        <span className="badge bg-secondary">{productDetail.category.name}</span>
                    </div>
                    <h4 className="mt-3">Chọn dung tích:</h4>
                    <div className="d-flex gap-2 w-50">
                        {sortedProductDetails.map((detail) => (
                            <button
                                key={detail.volume}
                                className={`btn w-25 ${selectedVolume === detail.volume ? "btn-secondary rounded-0" : "btn-outline-secondary rounded-0"}`}
                                onClick={() => handleVolumeChange(detail.volume)}
                                style={{opacity: detail.stock <= 0 ? 0.5 : 1}}
                            >
                                {detail.volume}ml
                            </button>
                        ))}
                    </div>
                    <p className="fs-3 text-dark mt-3 mb-0">{getPrice()}</p>
                    {error && <div className="text-danger">{error}</div>}
                    <div className="d-flex align-items-center mt-3">
                        <button className="btn btn-sm btn-outline-secondary rounded-0"
                                onClick={() => handleQuantityChange(-1)}>
                            -
                        </button>
                        <span className="mx-3 fs-5">{quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary rounded-0"
                                onClick={() => handleQuantityChange(1)}>
                            +
                        </button>
                    </div>
                    <div className="mt-4">
                        <AddToCart productDetail={productDetail} selectedVolume={selectedVolume} quantity={quantity}
                                   onError={(errorMsg) => setError(errorMsg)}/>
                        <button className="btn btn-danger py-2 rounded-0" onClick={handleBuyNow}>
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
    );
}

export default ProductDetail;
