import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Helper from "../../utils/Helper";

const ListCartItem = ({item, product, onQuantityChange, onRemove}) => {
    const [showModal, setShowModal] = useState(false);

    const handleRemove = () => {
        onRemove(item.id);
        setShowModal(false);
    };

    return product ? (
        <>
            <div className="d-flex border-bottom border-top py-3">
                <img
                    src={product.images[0].url}
                    alt={product.name}
                    style={{width: '80px', height: '80px'}}
                    className="img-fluid rounded mx-3 my-auto"
                />
                <div className="flex-grow-1 w-100">
                    <p className="m-0 text-danger">Mã hàng: {product.sku}</p>
                    <p className="m-0 fw-bold">{product.brand.name}</p>
                    <p className="m-0">{product.name}</p>
                    <p className="m-0">{product.category.name}</p>
                    <p className="m-0">Dung tích: {item.productDetail.volume}ml</p>
                </div>
                <div className="flex-grow-1">
                    <p className="text-danger m-0">{Helper.formatPrice(item.productDetail.price)}</p>
                </div>
                <div className="flex-grow-1 mx-5">
                    <p className="m-0">Số lượng</p>
                    <div className="d-flex mt-2 align-items-center">
                        <button
                            className="bg-body border-0"
                            onClick={() => onQuantityChange(item.id, -1)}
                        >
                            <i className="bi bi-dash-square"></i>
                        </button>
                        <span className="mx-2 fs-6">{item.quantity}</span>
                        <button
                            className="bg-body border-0"
                            onClick={() => onQuantityChange(item.id, 1)}
                        >
                            <i className="bi bi-plus-square"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p className="m-0">Bạn có chắc chắn muốn xóa sản phẩm
                            <span className="fw-bold"> {product.name} {product.concentration} </span>
                            khỏi giỏ hàng?
                        </p>
                    </div>
                    <div className="text-danger"><small>Lưu ý: Hành động này không thể hoàn tác!!!</small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" className="btn-sm" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="outline-danger" className="btn-sm" onClick={handleRemove}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    ) : null;
};

export default ListCartItem;
