import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Nav from '../Component/Nav/Nav';
import Footer from '../Component/Footer/Footer';
import { fetchUser } from "../Redux/auth/authSlice";

export default function MainLayout() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchUser());
        }
    }, [dispatch, token]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Nav/>
            <div className="flex-grow-1 ">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
