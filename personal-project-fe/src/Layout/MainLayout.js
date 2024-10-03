import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Component/Nav/Nav';
import {fetchUser} from "../Redux/auth/authSlice";
import Home from "../Pages/home/Home";

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
            <Nav />
            <Home/>
        </div>
    );
}