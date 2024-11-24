import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressCustomer from "./AddressCustomer";

function InfoCustomer() {
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    return (
        <div>
            <h5 className="fw-normal">Thông tin khách hàng</h5>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingName">Họ và tên</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingPhone"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="floatingPhone">Số điện thoại</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    id="floatingAddress"
                    placeholder="Địa chỉ"
                />
                <label htmlFor="floatingAddress">Địa chỉ</label>
            </div>
            <AddressCustomer/>
        </div>
    );
}

export default InfoCustomer;
