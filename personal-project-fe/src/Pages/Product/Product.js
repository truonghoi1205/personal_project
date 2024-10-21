import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsByBrands, fetchProductsByCategories } from "../../Redux/product/productSlice";
import Helper from "../../utils/Helper";
import Lottie from "lottie-react";
import empty from "../../LottieData/empty.json";
import ListBrand from "../../Component/Brand/ListBrand";

function Product() {
    const { brandName, categoryName } = useParams();
    const dispatch = useDispatch();
    const [selectedBrand, setSelectedBrand] = useState(brandName || null);
    const [selectedCategory, setSelectedCategory] = useState(categoryName || null);
    const [filterType, setFilterType] = useState("all");
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        if (brandName) {
            setSelectedBrand(brandName);
            dispatch(fetchProductsByBrands(brandName));
        } else if (categoryName) {
            setSelectedCategory(categoryName);
            dispatch(fetchProductsByCategories(categoryName));
        } else {
            setFilterType("all");
            dispatch(fetchProducts());
        }
    }, [brandName, categoryName, dispatch]);

    return (
        <div className="container my-5">
            <p className="fs-1 mt-5 text-center">cửa hàng</p>
            <div className="bg-body-tertiary py-2 ps-2">
                <NavLink to="/">Trang chủ </NavLink>
                <span>/</span>
                <NavLink to="/san-pham"> cửa hàng</NavLink>
            </div>
            <div className="row mt-4">
                <div className="col-3 pe-5">
                    <input type="text" className="form-control py-2" placeholder="Tìm kiếm nhanh" />
                    <ListBrand />
                </div>
                <div className="col-9">
                    {filterType === "all" && <h2>Tất cả sản phẩm</h2>}
                    {filterType === "brand" && <h2>Hiển thị sản phẩm theo thương hiệu</h2>}
                    {filterType === "category" && <h2>Hiển thị sản phẩm theo danh mục</h2>}

                    <div className="row">
                        {products.length > 0 ? (
                            products.map((p, index) => (
                                <div key={index} className="col-3">
                                    <NavLink to={`/san-pham/${p.slug}`}>
                                        <div className="text-center" style={{ width: '200px' }}>
                                            <img
                                                className="product-card__img"
                                                src="/image/2__4__4947cad89d1248cc8b2027ae87f0e240_1024x1024.webp"
                                                alt="Product"
                                            />
                                            <div className="text-black-50">
                                                <small>{p.brand.name}</small>
                                            </div>
                                            <div className="text-black">
                                                <span>{p.name} {Helper.getAbbreviation(p.concentration)}</span>
                                            </div>
                                            <div className="product-card__price">
                                                <span>{Helper.formatPrice(p.productDetails[0]?.price)}</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            ))
                        ) : (
                            <div className='text-center'>
                                <Lottie animationData={empty} style={{ width: '300px', margin: 'auto' }} />
                                <p className='fs-3'>Không có sản phẩm nào!!!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
