import {NavLink} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Logout from "../../Component/auth/Logout";
import Logo from "../../Component/Logo";

function Nav() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className=" border-bottom py-4 border-black">
            <div className="px-5 d-flex justify-content-between align-items-center">
                <Logo/>
                <div className="d-flex justify-content-end w-100">
                    <NavLink href={"#"} className="fs-6 mx-2 fw-medium">trang chủ</NavLink>
                    <NavLink href={"#"} className="fs-6 mx-2 fw-medium">giới thiệu</NavLink>
                    <NavLink href={"#"} className="fs-6 mx-2 fw-medium">thương hiệu</NavLink>
                    <NavLink href={"#"} className="fs-6 mx-2 fw-medium">sản phẩm</NavLink>
                    <NavLink href={"#"} className="fs-6 mx-2 fw-medium">blog</NavLink>
                </div>
                <div className="d-flex ms-3 align-items-center">
                    <Link to={"/search"} className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="29" fill="currentColor"
                             className="bi bi-search" viewBox="0 0 16 19">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </Link>
                    <Link to={"/cart"} className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="29" fill="currentColor"
                             className="bi bi-cart3 mx-4 " viewBox="0 0 16 20">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </Link>

                    {!isAuthenticated ? (
                        <Link to="/login" className="text-black" aria-label="Login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" fill="currentColor"
                                 className="bi bi-person" viewBox="0 0 16 19">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        </Link>
                    ) : (
                        <div className="d-flex align-items-center">
                            <h6 className="mb-0">Chào {user?.name}</h6>
                            <Logout />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Nav;
