import Helper from "../../utils/Helper";
import React from "react";
import { useSelector } from "react-redux";

function ShoppingCartInfo() {
    const { cartItems = [] } = useSelector((state) => state.cart);
    const { products = [] } = useSelector((state) => state.products);

    return (
        <div className="">
            {cartItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) {
                    return (
                        <div key={item.id} className="d-flex align-items-center">
                            <p className="text-danger">Chi tiết sản phẩm không có sẵn cho mặt hàng này.</p>
                        </div>
                    );
                }
                return (
                    <div key={item.id} className="d-flex align-items-center mb-3">
                        <div className="position-relative">
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                                {item.quantity}
                            </span>
                            <img
                                src={product.images?.[0]?.url || "/placeholder-image.png"}
                                className="border rounded p-1"
                                alt={product.name || "Product Image"}
                                style={{ width: "80px", height: "80px" }}
                            />
                        </div>
                        <div className="ms-3 d-flex align-items-center justify-content-between w-100">
                            <div>
                                <p className="m-0">{product.name || "Unknown Product"}</p>
                                <p className="m-0 text-body-tertiary">
                                    <small>{product.concentration || ""}/{item.productDetail.volume || ""}ml</small>
                                </p>
                            </div>
                            <div>
                                <p className="m-0">{Helper.formatPrice(item.quantity * item.productDetail.price)}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="border-bottom border-top">
                <div className="d-flex justify-content-between my-3">
                    <p className="m-0">Tạm tính:</p>
                    <p className="m-0">
                        {Helper.formatPrice(cartItems.reduce((total, item) => total + (item.quantity * (item.productDetail.price || 0)), 0))}
                    </p>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <p className="m-0">Phí vận chuyển:</p>
                    <p className="m-0"><i className="bi bi-dash-lg"></i></p>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <p>Tổng:</p>
                <h6 className="text-danger">
                    {Helper.formatPrice(cartItems.reduce((total, item) => total + (item.quantity * (item.productDetail.price || 0)), 0))}
                </h6>
            </div>
        </div>
    );
}

export default ShoppingCartInfo;
