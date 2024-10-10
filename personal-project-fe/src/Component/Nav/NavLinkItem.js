import { NavLink } from "react-router-dom";

const NavLinkItem = ({ to, label }) => (
    <NavLink to={to} className={({ isActive }) => `fs-6 mx-2 fw-medium nav-link ${isActive ? "active" : ""}`}>
        {label}
    </NavLink>
);

export default NavLinkItem;
