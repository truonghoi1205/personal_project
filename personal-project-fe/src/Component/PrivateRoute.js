import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = ({ requiredRoles }) => {
    const { isAuthenticated, roles } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const hasRequiredRole = roles.some(role => requiredRoles.includes(role.name));

    if (requiredRoles.length > 0 && !hasRequiredRole) {
        return <Navigate to="/403" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
