import {Navigate, Outlet} from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = ({ requiredRoles }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const roles = useSelector((state) => state.auth.roles);

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles && (!roles || !roles.some(role => requiredRoles.includes(role.name)))) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet /> ;
};

export default PrivateRoute;
