import { useState } from "react";

function FindByPrice() {
    const [priceRange, setPriceRange] = useState([0, 50000000]);
    const [quickSelect, setQuickSelect] = useState(null);

    const handleRangeChange = (event) => {
        const value = event.target.value.split(',').map(Number);
        setPriceRange(value);
    };

    const handleQuickSelectChange = (event) => {
        const value = event.target.name;
        setQuickSelect(value);
    };

    return (
        <div className="mt-4">
            <h5>THEO GIÁ</h5>
            <div>
                <input
                    type="range"
                    id="price-range"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={priceRange.join(',')}
                    onChange={handleRangeChange}
                    className="form-range"
                />
            </div>
            <div className="form-check mb-2">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="1-3tr"
                    name="1-3tr"
                    checked={quickSelect === "1-3tr"}
                    onChange={handleQuickSelectChange}
                />
                <label className="form-check-label" htmlFor="1-3tr">
                    1.500.000 - 3.000.000
                </label>
            </div>
            <div className="form-check mb-2">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="3-5tr"
                    name="3-5tr"
                    checked={quickSelect === "3-5tr"}
                    onChange={handleQuickSelectChange}
                />
                <label className="form-check-label" htmlFor="3-5tr">
                    3.000.000 - 5.000.000
                </label>
            </div>
            <div className="form-check mb-2">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="above-5tr"
                    name="above-5tr"
                    checked={quickSelect === "above-5tr"}
                    onChange={handleQuickSelectChange}
                />
                <label className="form-check-label" htmlFor="above-5tr">
                    > 5.000.000
                </label>
            </div>
        </div>
    );
}

export default FindByPrice;
