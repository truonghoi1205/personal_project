import React from "react";

function ProductSearch() {
    return (
        <div className="d-flex align-items-center">
            <input
                type="text"
                className="form-control-sm form-control"
                placeholder="Nhập tên sản phẩm"
            />
            <button className="btn">
                <i className="bi bi-search"></i>
            </button>
        </div>
    );
}

export default ProductSearch;