import React from "react";
import Helper from "../../utils/Helper";

function ProductDetails({productDetails}) {
    const sortedDetails = Helper.sortProductDetailsByVolume(productDetails);

    return (
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
                        {detail.stock} sp
                    </div>
                ))}
            </td>
        </>
    );
}

export default ProductDetails;
