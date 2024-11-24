function ShippingRate() {
    return (
        <div className="mt-5">
            <h5 className="fw-normal">Phương thức vận chuyển</h5>
            <label htmlFor="shippingRate"
                   className="d-flex align-items-center border p-3 rounded cursor-pointer mt-4">
                <div>
                    <input type="radio"
                           className="form-check-input"
                           id="shippingRate1"
                           name="shippingRate"
                           value="homeDelivery"
                           checked={true}
                           readOnly
                    />
                </div>
                <div className="w-100 d-flex ms-2 justify-content-between align-items-center">
                    <span>Giao hàng tận nơi</span>
                    <span>0<sup> ₫</sup></span>
                </div>
            </label>
        </div>
    );
}

export default ShippingRate;