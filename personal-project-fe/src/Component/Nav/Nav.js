import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from "react-redux";
import Logo from "../../Component/Logo";
import NavLinkItem from "./NavLinkItem";
import DropdownMenu from "./DropdownMenu";
import UserMenu from "./UserMenu";
import "../../style/scss/Nav.scss";

function Nav() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="border-bottom">
            <div className="px-4 d-flex justify-content-between align-items-center">
                <div className="logo-block">
                    <Logo />
                </div>
                <div className="d-flex justify-content-end nav-block">
                    <NavLinkItem to="/" label="Trang Chủ" />
                    <NavLinkItem to="gioi-thieu" label="Giới Thiệu" />
                    <DropdownMenu />
                    <NavLinkItem to="/thuong-hieu" label="Thương Hiệu" />
                    <NavLinkItem to="/blog" label="Blog" />
                </div>

                <div className="user-block">
                    <UserMenu isAuthenticated={isAuthenticated} user={user} />
                </div>
            </div>
        </div>
    );
}

export default Nav;
