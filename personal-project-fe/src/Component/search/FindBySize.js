import { useState } from "react";

function FindBySize() {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedSize((prevSize) => (prevSize === value ? null : value));
    };

    return (
        <div className="mt-4">
            <h5>THEO SIZE</h5>
            <div className="row ms-1 mt-4">
                <div className="form-check mb-2 col-5">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="30ml"
                        value="30ml"
                        checked={selectedSize === "30ml"}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="30ml">
                        30ml
                    </label>
                </div>
                <div className="form-check mb-2 col-5">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="50ml"
                        value="50ml"
                        checked={selectedSize === "50ml"}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="50ml">
                        50ml
                    </label>
                </div>
                <div className="form-check mb-2 col-5">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="100ml"
                        value="100ml"
                        checked={selectedSize === "100ml"}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="100ml">
                        100ml
                    </label>
                </div>
                <div className="form-check mb-2 col-5">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="200ml"
                        value="200ml"
                        checked={selectedSize === "200ml"}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="200ml">
                        200ml
                    </label>
                </div>
            </div>
        </div>
    );
}

export default FindBySize;
