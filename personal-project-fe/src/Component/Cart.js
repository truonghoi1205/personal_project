import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCartItemByCart} from '../Redux/cart/cartSlice';
import Helper from '../utils/Helper';
import {fetchProducts} from '../Redux/product/productSlice';

function Cart({cartId, isOpen}) {
    const dispatch = useDispatch();
    const {cartItems, status} = useSelector((state) => state.cart);
    const {products} = useSelector((state) => state.products);

    useEffect(() => {
        if (cartId && status === 'idle') {
            dispatch(fetchProducts());
            dispatch(fetchCartItemByCart(cartId));
        }
    }, [cartId, status, dispatch]);


    return (
        <div className={`cart-dropdown bg-white p-2 shadow ${isOpen ? 'show' : ''}`}>
            <h5 className="fw-bold mb-3">Giỏ hàng</h5>
            {status === 'loading' && <p>Đang tải...</p>}
            {status === 'succeeded' && cartItems.length === 0 && (
                <p className="text-center">Giỏ hàng của bạn trống.</p>
            )}
            {status === 'succeeded' && cartItems.length > 0 && (
                <>
                    <ul className="cart-items list-unstyled mb-3" style={{maxHeight: '300px', overflowY: 'auto'}}>
                        {cartItems.slice(0, 9999999).map((item) => {
                            const product = products.find((p) => p.id === item.productId);
                            return (
                                <li key={item.id} className="cart-item d-flex bg-body-secondary align-items-center">
                                    <img
                                        src="https://product.hstatic.net/1000340570/product/gio-trang-new_e73c68026bde47deab04676c44c9d68b_master.jpg"
                                        alt={product?.name || 'Sản phẩm không rõ'}
                                        className="cart-item-image me-3"
                                        style={{width: '60px', height: '60px', objectFit: 'cover', margin: "auto"}}
                                    />
                                    <div className="cart-item-details flex-grow-1">
                                        <p className="mb-1 fw-bold">{product?.name || 'Sản phẩm không rõ'}</p>
                                        <p className="mb-1">{product?.concentration}/{item.productDetail.volume}ml</p>
                                        <p className="mb-1">
                                            Thương hiệu: <span className="fw-bold">{product?.brand.name}</span>
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <p className="m-0">Số lượng: <span className="fw-bold">{item.quantity}</span></p>
                                            <p className="fw-bold m-0">{Helper.formatPrice(item.productDetail.price)}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="cart-summary d-flex justify-content-between align-items-center border-top pt-2">
                        <p className="fw-bold m-0">Tổng <small className='text-black fw-normal'>({cartItems.length} sản phẩm)</small></p>
                        <span className="fw-bold">
                            {Helper.formatPrice(
                                cartItems.reduce(
                                    (total, item) => total + item.quantity * item.productDetail.price,
                                    0
                                )
                            )}
                        </span>
                    </div>
                    <button className="cart-checkout-btn btn btn-danger w-100 mt-3">
                        Xem giỏ hàng & thanh toán
                    </button>
                    <p className="cart-shipping-info text-center mt-2 text-muted">
                        <strong>SHIP NHANH 3H</strong><br/>
                        FREE SHIP MỌI ĐƠN HÀNG
                    </p>
                </>
            )}
        </div>
    );
}

export default Cart;
