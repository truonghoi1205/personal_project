import React from 'react';
import { Outlet} from "react-router-dom";

const PrivateRoute = ({ requiredRole }) => {



    return <Outlet />;
};

export default PrivateRoute;
