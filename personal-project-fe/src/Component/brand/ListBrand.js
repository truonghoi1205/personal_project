import { useEffect } from "react";
import { fetchBrands } from "../../Redux/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Helper from "../../utils/Helper";

function ListBrand({ onBrandSelect }) {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands.brands);
    const status = useSelector((state) => state.brands.status);
    const error = useSelector((state) => state.brands.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBrands());
        }
    }, [status, dispatch]);

    const sortedBrands = brands ? [...brands].sort((a, b) => a.name.localeCompare(b.name)) : [];


    if (status === "loading") {
        return <p>Đang tải danh sách thương hiệu...</p>;
    }

    if (error) {
        return <p>Đã xảy ra lỗi: {error.message || error}</p>;
    }

    return (
        <div className="mt-3">
            {sortedBrands.length > 0 ? (
                <ul className="list-unstyled custom-scrollbar">
                    {sortedBrands.map((brand) => (
                        <li key={brand.id} className="mb-2">
                            <Link to={`/thuong-hieu/${Helper.formatUrl(brand.name)}`}>
                                {brand.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có thương hiệu nào.</p>
            )}
        </div>
    );
}

export default ListBrand;
