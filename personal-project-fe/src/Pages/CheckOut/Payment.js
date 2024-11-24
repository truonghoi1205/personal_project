import React from "react";

function Payment() {
    return (
        <div className="mt-5">
            <h5 className="fw-normal">Phương thức thanh toán</h5>
            <div className="border rounded">
                <label htmlFor="cod" className="w-100 cursor-pointer">
                    <div className="d-flex align-items-center p-3">
                        <input
                            type="radio"
                            id="cod"
                            name="payment"
                            className="me-2 form-check-input cursor-pointer"
                        />
                        <img
                            src="/image/cash-on-delivery.png"
                            alt="cash-on-delivery"
                            width={45}
                            className="me-2 border rounded p-1"
                        />
                        <p className="m-0">COD (Thanh toán khi nhận hàng)</p>
                    </div>
                </label>
                <label htmlFor="bankTransfer" className="w-100 cursor-pointer border-top border-bottom">
                    <div className="d-flex align-items-center p-3 ">
                        <input
                            type="radio"
                            id="bankTransfer"
                            name="payment"
                            className="me-2 form-check-input cursor-pointer"
                        />
                        <img
                            src="/image/atm-card.png"
                            alt="bank-transfer"
                            width={45}
                            className="me-2 border rounded p-1"
                        />
                        <p className="m-0">Chuyển khoản qua ngân hàng</p>
                    </div>
                </label>
                <label htmlFor="vnpay" className="w-100 cursor-pointer">
                    <div className="d-flex align-items-center p-3">
                        <input
                            type="radio"
                            id="vnpay"
                            name="payment"
                            className="me-2 form-check-input cursor-pointer"
                        />
                        <img
                            src="/image/vnpay-logo-vinadesign-25-12-57-55.jpg"
                            alt="VNPAY"
                            width={45}
                            className="me-2 border rounded p-1"
                        />
                        <div>
                            <p className="m-0">Thẻ ATM/Visa/Master/JCB/QR Pay qua cổng VNPAY</p>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Payment;
