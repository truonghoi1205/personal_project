import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../Component/Logo';
import NavLinkItem from './NavLinkItem';
import DropdownMenu from './DropdownMenu';
import UserMenu from './UserMenu';
import '../../style/scss/Nav.scss';
import Cart from '../Cart';
import { fetchCartId, fetchCartItemByCart } from '../../Redux/cart/cartSlice';

function Nav() {
    const dispatch = useDispatch();
    const [isCartOpen, setCartOpen] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const cartId = useSelector((state) => state.cart.cartId);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartItemCount = cartItems.length;

    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(fetchCartId(user.customerId));
        }
    }, [isAuthenticated, user, dispatch]);

    useEffect(() => {
        if (cartId) {
            dispatch(fetchCartItemByCart(cartId));
        }
    }, [cartId, dispatch]);

    const handleMouseEnter = () => {
        setCartOpen(true);
    };

    const handleMouseLeave = () => {
        setCartOpen(false);
    };

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
                <div className="user-block d-flex align-items-center">
                    <UserMenu isAuthenticated={isAuthenticated} user={user} />
                    <i className="bi bi-heart mx-3 fs-5" style={{ cursor: 'pointer' }}></i>
                    <div
                        className="cart-container"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: 'pointer', position: 'relative' }}
                    >
                        <i className="bi bi-cart3 fs-5"></i>
                        {cartItemCount > 0 && (
                            <span className="cart-item-count">{cartItemCount}</span>
                        )}
                        <Cart cartId={cartId} isOpen={isCartOpen} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;
