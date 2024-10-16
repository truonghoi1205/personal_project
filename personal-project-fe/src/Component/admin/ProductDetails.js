import React from "react";
import Helper from "../../utils/Helper";

function ProductDetails({ productDetails }) {
    const sortedDetails = [...productDetails].sort((a, b) => a.volume - b.volume);

    return (
        <>
            {sortedDetails.length > 0 ? (
                <>
                    <td>
                        {sortedDetails.map((detail) => (
                            <div key={detail.id}>
                                {detail.volume} ml
                            </div>
                        ))}
                    </td>
                    <td>
                        {sortedDetails.map((detail) => (
                            <div key={detail.id}>
                                {Helper.formatPrice(detail.price)}
                            </div>
                        ))}
                    </td>
                    <td>
                        {sortedDetails.map((detail) => (
                            <div key={detail.id}>
                                {detail.stock}
                            </div>
                        ))}
                    </td>
                </>
            ) : (
                <>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                </>
            )}
        </>
    );
}

export default ProductDetails;
