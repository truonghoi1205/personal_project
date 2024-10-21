import { useDispatch } from "react-redux";
import { logout } from "../../Redux/auth/authSlice";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";
import Helper from "../../utils/Helper";
import {resetCart} from "../../Redux/cart/cartSlice";

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(resetCart());
        navigate("/");
        Helper.toastSuccess('Đăng xuất thành công!');
    }

    return (
        <li onClick={handleLogout} className="d-flex align-items-center" style={{cursor: 'pointer'}}>
            <i className="bi bi-door-closed"></i> Đăng xuất
        </li>
    );
}

export default Logout;
