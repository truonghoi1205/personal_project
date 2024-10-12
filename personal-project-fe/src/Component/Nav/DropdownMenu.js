import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories} from "../../Redux/category/categorySlice";
import Helper from "../../utils/Helper";

function DropdownMenu({onCategorySelect}) {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);
    const status = useSelector((state) => state.categories.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);


    if (status === "loading") {
        return <p>Đang tải danh sách thương hiệu...</p>;
    }


    return (
        <div className="dropdown-product mx-2">
            <NavLink to="/san-pham" className="fs-6 fw-medium dropdown-toggle nav-link" id="productDropdown">
                Sản Phẩm
            </NavLink>
            {
                (categories.length > 0) ? (
                    <ul className="dropdown-menu" aria-labelledby="productDropdown">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    to={`/phan-loai/${Helper.formatUrl(category.name)}`}
                                    className="dropdown-item"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="dropdown-menu" aria-labelledby="productDropdown">
                        <li>
                            <p className="dropdown-item">Không có phân loại nào</p>
                        </li>
                    </ul>
                )
            }

        </div>
    );
}

export default DropdownMenu;
