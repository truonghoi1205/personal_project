import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCartItem, fetchCartItemByCart, updateQuantity} from '../../Redux/cart/cartSlice';
import Helper from "../../utils/Helper";
import ListCartItem from './ListCartItem';
import {Link} from "react-router-dom";

const Cart = () => {
    const {cartItems} = useSelector((state) => state.cart);
    const {products, status} = useSelector((state) => state.products);
    const cartId = useSelector((state) => state.cart.cartId);
    const dispatch = useDispatch();


    useEffect(() => {
        if (cartId && status === 'idle') {
            dispatch(fetchCartItemByCart(cartId));
        }
    }, [cartId, status, dispatch]);

    const handleQuantityChange = (id, change) => {
        const item = cartItems.find((item) => item.id === id);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity > 0) {
                dispatch(updateQuantity({cartItemId: id, quantity: newQuantity}));
            }
        }
    };

    const renderCartItems = () => {
        return cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
                <ListCartItem
                    key={item.id}
                    item={item}
                    product={product}
                    onQuantityChange={handleQuantityChange}
                    onRemove={(id) => dispatch(deleteCartItem(id))}
                />
            );
        });
    };

    return (
        <div className="container w-75 my-5">
            <h4 className="fw-normal">Giỏ hàng</h4>
            <div className="d-flex justify-content-between">
                <span className="text-black-50">({cartItems.length} sản phẩm)</span>
                <Link to="/products"><small>Tiếp tục mua hàng</small></Link>
            </div>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <h4>Giỏ hàng của bạn trống</h4>
                    <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
                </div>
            ) : (
                <div className="row mt-5">
                    <div className="col-lg-8 col-md-7">
                        {renderCartItems()}
                    </div>
                    <div className="col-lg-3 col-md-5 ms-5">
                        <div className="border-bottom">
                            <div className="d-flex justify-content-between mb-3">
                                <p className="m-0">Tạm tính:</p>
                                <p className="m-0">
                                    {Helper.formatPrice(cartItems.reduce((total, item) => total + item.quantity * item.productDetail.price, 0))}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <p className="m-0">Phí vận chuyển:</p>
                                <p className="m-0">Free</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <p>Tổng:</p>
                            <h6 className="text-danger">
                                {Helper.formatPrice(cartItems.reduce((total, item) => total + item.quantity * item.productDetail.price, 0))}
                            </h6>
                        </div>
                        <Link to="/checkout" className="btn btn-danger w-100 rounded-0">
                            Thanh toán
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
