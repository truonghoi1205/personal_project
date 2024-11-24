import InfoCustomer from "./InfoCustomer";
import ShippingRate from "./ShippingRate";
import React from "react";
import ShoppingCartInfo from "./ShoppingCartInfo";
import Payment from "./Payment";
import {Link} from "react-router-dom";

function CheckOut() {

    return (
        <div className="container w-75">
            <h3 className="mt-3 mb-0 fw-normal">Thanh toán</h3>
            <div className="row mt-3 mb-5 justify-content-sm-between">
                <div className="col-7 py-3 px-5 border-end">
                    <InfoCustomer/>
                    <ShippingRate/>
                    <Payment/>
                    <div className="align-items-center mt-4 d-flex justify-content-between">
                        <Link to="/cart">Giỏ hàng</Link>
                        <button className="btn btn-sm text-white p-3" style={{backgroundColor: "#338dbc"}}>
                            Hoàn tất đơn hàng
                        </button>
                    </div>
                </div>
                <div className="col-5 mx-auto">
                    <ShoppingCartInfo/>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
