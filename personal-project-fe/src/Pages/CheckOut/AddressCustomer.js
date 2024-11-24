import React, {useEffect, useState} from "react";

function AddressCustomer() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then((response) => response.json())
            .then((data) => setProvinces(data))
            .catch((error) => console.error("Error fetching provinces:", error));
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://provinces.open-api.vn/api/d/?province=${selectedProvince}`)
                .then((response) => response.json())
                .then((data) => {
                    const filteredDistricts = data.filter(
                        (district) => district.province_code === parseInt(selectedProvince)
                    );
                    setDistricts(filteredDistricts);
                    setWards([]);
                    setSelectedDistrict("");
                })
                .catch((error) => console.error("Error fetching districts:", error));
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://provinces.open-api.vn/api/w/?district=${selectedDistrict}`)
                .then((response) => response.json())
                .then((data) => {
                    const filteredWards = data.filter(
                        (ward) => ward.district_code === parseInt(selectedDistrict)
                    );
                    setWards(filteredWards);
                })
                .catch((error) => console.error("Error fetching wards:", error));
        }
    }, [selectedDistrict]);

    return (
        <div className="row d-flex mt-3">
            <div className="col-4 mb-3">
                <label className="form-label">Tỉnh/Thành</label>
                <select
                    className="form-select"
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                >
                    <option value="">Chọn Tỉnh/Thành</option>
                    {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                            {province.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-4 mb-3">
                <label className="form-label">Quận/Huyện</label>
                <select
                    className="form-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-4 mb-3">
                <label className="form-label">Phường/Xã</label>
                <select className="form-select">
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default AddressCustomer;