import Helper from "../../utils/Helper";
import CartItemApi from "../../Apis/CartItemApi";
import { fetchCartItemByCart } from "../../Redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddToCart({ productDetail, selectedVolume, quantity, onError }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const cartId = useSelector((state) => state.cart.cartId);

    const detail = productDetail?.productDetails?.find(
        (item) => item.volume === selectedVolume
    );

    const handleAddToCart = async () => {
        if (!selectedVolume) {
            onError('Vui lòng chọn dung tích.');
            return;
        }
        if (!token) {
            navigate("/login");
            return;
        }

        if (detail && detail.stock <= 0) {
            Helper.toastError('Sản phẩm này tạm hết hàng!');
            return;
        }

        setLoading(true);

        setTimeout(async () => {
            try {
                await CartItemApi.addToCart({
                    productDetail: detail,
                    cartId: cartId,
                    quantity: quantity
                });
                Helper.toastSuccess("Thêm vào giỏ hàng thành công!");
                dispatch(fetchCartItemByCart(cartId));
            } catch (error) {
                Helper.toastError("Thêm vào giỏ hàng thất bại!");
            } finally {
                setLoading(false);
            }
        }, 500);
    };

    return (
        <>
            <button
                className="btn btn-outline-dark py-2 px-3 me-2 rounded-0"
                onClick={handleAddToCart}
                disabled={loading}
            >
                {loading ? "Đang thêm..." : "Thêm vào giỏ hàng"} <i className="bi bi-cart-plus"></i>
            </button>
        </>
    );
}

export default AddToCart;
