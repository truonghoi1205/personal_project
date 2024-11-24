import { useState } from "react";

function FindBySeason({ onSeasonChange }) {
    const [selectedSeason, setSelectedSeason] = useState(null);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const newSeason = checked ? name : null;
        setSelectedSeason(newSeason);
        onSeasonChange(newSeason);
    };

    return (
        <div className="mt-4">
            <h5>THEO MÙA</h5>
            <div className="row ms-1 mt-4">
                {["xuân", "hạ", "thu", "đông"].map((season, index) => (
                    <div className="form-check mb-2 col-5" key={index}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={season}
                            name={season}
                            checked={selectedSeason === season}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={season}>
                            {season === "xuân"
                                ? "Xuân"
                                : season === "hạ"
                                    ? "Hạ"
                                    : season === "thu"
                                        ? "Thu"
                                        : "Đông"}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FindBySeason;
