import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from '../../Component/Nav/Nav';
import Footer from "../../Component/Footer/Footer";
import { NavLink } from "react-router-dom";
import ListBrand from "../../Component/Brand/ListBrand";
import ListProduct from "../../Component/Product/ListProduct";

function Product() {
    const { brandName } = useParams();
    const [selectedBrand, setSelectedBrand] = useState(brandName || null);
    const { categoryName } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(categoryName || null);

    useEffect(() => {
        if (brandName) {
            setSelectedBrand(brandName);
        } else {
            setSelectedBrand(null);
        }
    }, [brandName]);

    useEffect(() => {
        if (categoryName) {
            setSelectedCategory(categoryName);
        } else {
            setSelectedCategory(null);
        }
    }, [categoryName]);

    return (
        <div>
            <Nav />
            <div className="container my-5">
                <p className="fs-1 mt-5 text-center">shop</p>
                <div className="bg-body-tertiary py-2 ps-2">
                    <NavLink to="/">Trang chủ </NavLink>
                    <span>/</span>
                    <NavLink to="/san-pham"> shop</NavLink>
                </div>
                <div className="row mt-4">
                    <div className="col-3 pe-5">
                        <input type="text" className="form-control py-2" placeholder="Tìm kiếm nhanh" />
                        <div>
                            <ListBrand />
                        </div>
                    </div>
                    <div className='col-9'>
                        <ListProduct selectedBrand={selectedBrand} selectedCategory={selectedCategory}/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;
