import NavAdmin from "../Component/admin/NavAdmin";
import HeaderAdmin from "../Component/admin/HeaderAdmin";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUser} from "../Redux/auth/authSlice";

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

    return(
        <div>
            <NavAdmin/>
            <div>
                <HeaderAdmin/>
            </div>
        </div>
    )
}

export default MainLayoutAdmin;