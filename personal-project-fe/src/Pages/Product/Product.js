import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    fetchProductsByBrands,
    fetchProductsByCategories,
    fetchProductsBySeason
} from "../../Redux/product/productSlice";
import Lottie from "lottie-react";
import empty from "../../LottieData/empty.json";
import FindByBrand from "../../Component/search/FindByBrand";
import FindBySeason from "../../Component/search/FindBySeason";
import FindByPrice from "../../Component/search/FindByPrice";
import ProductCard from "./ProductCart";
import "../../style/scss/Product.scss"
import Nav from '../../Component/Nav/Nav';
import Footer from '../../Component/Footer/Footer';
import FindBySize from "../../Component/search/FindBySize";

function Product() {
    const { brandName, categoryName } = useParams();
    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState("all");
    const products = useSelector((state) => state.products.products);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [selectedSeasons, setSelectedSeasons] = useState([]);

    useEffect(() => {
        if (brandName) {
            dispatch(fetchProductsByBrands(brandName));
            setFilterType("brand");
        } else if (categoryName) {
            dispatch(fetchProductsByCategories(categoryName));
            setFilterType("category");
        } else {
            dispatch(fetchProducts());
            setFilterType("all");
        }
    }, [brandName, categoryName, dispatch]);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSeasonChange = (seasons) => {
        setSelectedSeasons(seasons);
        dispatch(fetchProductsBySeason(seasons));
    };

    return (
        <div>
            <Nav/>
            <div className="container my-5">
                <p className="fs-1 mt-5 text-center">Cửa hàng</p>
                <div className="bg-body-tertiary py-2 ps-2">
                    <NavLink to="/">Trang chủ </NavLink>
                    <span>/</span>
                    <NavLink to="/products"> Cửa hàng</NavLink>
                </div>
                <div className="row mt-4">
                    <div className="col-3 pe-5" style={{width: '300px'}}>
                        <FindByBrand/>
                        <FindBySeason onSeasonChange={handleSeasonChange}/>
                        <FindBySize/>
                        <FindByPrice/>
                    </div>
                    <div className="col-9">
                        {filterType === "all" && <p className="m-0 text-secondary">Hiển thị {currentPage}-{totalPages} của {products.length} kết quả</p>}
                        {filterType === "brand" && <p className="m-0 text-secondary">Hiển thị tất cả {products.length} kết quả</p>}
                        {filterType === "category" && <p className="m-0 text-secondary">Hiển thị tất cả {products.length} kết quả</p>}
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 gx-5 gy-4 mt-1">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((p) => (
                                    <ProductCard key={p.id} product={p}/>
                                ))
                            ) : (
                                <div className="text-center m-auto w-50">
                                    <Lottie animationData={empty}/>
                                    <p className="fs-4">Không tìm thấy sản phẩm phù hợp!</p>
                                </div>
                            )}
                        </div>
                        <div className="pagination mt-4">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Product;
