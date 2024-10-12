import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchProducts, fetchProductsByBrands, fetchProductsByCategories } from "../../Redux/product/productSlice";
import { Link } from "react-router-dom";
import Helper from "../../utils/Helper";
import Lottie from "lottie-react";
import empty from "../../LottieData/empty.json";

function ListProduct({ selectedBrand, selectedCategory }) {
    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState("all");
    const products = useSelector((state) => state.products.products);

    console.log(products)

    useEffect(() => {
        if (selectedBrand) {
            setFilterType("brand");
            dispatch(fetchProductsByBrands(selectedBrand));
        } else if (selectedCategory) {
            setFilterType("category");
            dispatch(fetchProductsByCategories(selectedCategory));
        } else {
            setFilterType("all");
            dispatch(fetchProducts());
        }
    }, [selectedBrand, selectedCategory, dispatch]);

    return (
        <div className='row'>
            {filterType === "all" && <h2>Tất cả sản phẩm</h2>}
            {filterType === "brand" && <h2>Hiển thị sản phẩm theo thương hiệu</h2>}
            {filterType === "category" && <h2>Hiển thị sản phẩm theo danh mục</h2>}
            {products.length > 0 ? (
                products.map((p, index) => (
                    <div key={index} className="col-3">
                        <Link to={`/product/${p.id}`}>
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
                                    <span> {Helper.formatNumber(p.productDetails[0]?.price)}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className='text-center'>
                    <Lottie animationData={empty} style={{width: '400px',margin: 'auto'}}/>
                    <p className='fs-3'>Không có sản phẩm nào!!!</p>
                </div>
            )}
        </div>
    );
}

export default ListProduct;
