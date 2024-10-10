import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSelector} from "react-redux";
import Logo from "../../Component/Logo";
import NavLinkItem from "./NavLinkItem";
import DropdownMenu from "./DropdownMenu";
import UserMenu from "./UserMenu";
import "../../style/scss/Nav.scss";

function Nav() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="border-bottom py-4 border-black">
            <div className="px-5 d-flex justify-content-between align-items-center">
                <Logo />
                <div className="d-flex justify-content-end w-100">
                    <NavLinkItem to="/" label="Trang Chủ" />
                    <NavLinkItem to="#" label="Giới Thiệu" />
                    <DropdownMenu  />
                    <NavLinkItem to="/thuong-hieu" label="Thương Hiệu" />
                    <NavLinkItem to="/blog" label="Blog" />
                </div>
                <UserMenu isAuthenticated={isAuthenticated} user={user} />
            </div>
        </div>
    );
}

export default Nav;
