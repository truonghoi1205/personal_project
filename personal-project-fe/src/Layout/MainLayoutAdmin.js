import NavAdmin from "../Component/admin/NavAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../Redux/auth/authSlice";
import Dashboard from "../Component/admin/Dashboard";
import { Outlet } from "react-router-dom";

function MainLayoutAdmin() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const { status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchUser());
        }
    }, [dispatch, token]);

    if (status === 'loading') {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    return (
        <div className="admin-layout d-flex">
            <Dashboard />
            <div className="content-wrapper">
                <NavAdmin />
                <div className="content p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayoutAdmin;
