import Logout from "../auth/Logout";
import {useSelector} from "react-redux";

function HeaderAdmin() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            {isAuthenticated && (
                <div className="d-flex align-items-center">
                    <h6 className="mb-0">chào {user?.name}</h6>
                    <Logout />
                </div>
            )}
        </div>
    );
}

export default HeaderAdmin;
