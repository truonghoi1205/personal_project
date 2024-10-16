import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Nav from '../Component/Nav/Nav';
import {fetchUser} from "../Redux/auth/authSlice";
import Home from "../Pages/Home/Home";
import Footer from "../Component/Footer/Footer";
import AboutTab2 from "../Pages/AboutTab2";
import AboutTab1 from "../Pages/AboutTab1";

export default function MainLayout() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);


    useEffect(() => {
        if (token) {
            dispatch(fetchUser());
        }
    }, [dispatch, token]);

    return (
        <div>
            <Nav/>
            <Home/>
            <AboutTab1/>
            <AboutTab2/>
            <Footer/>
        </div>
    );
}