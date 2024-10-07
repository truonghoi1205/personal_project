import NavAdmin from "./NavAdmin";
import HeaderAdmin from "./HeaderAdmin";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUser} from "../../Redux/auth/authSlice";

function MainLayoutAdmin() {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);


    useEffect(() => {
        if (token) {
            dispatch(fetchUser());
        }
    }, [dispatch, token]);

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