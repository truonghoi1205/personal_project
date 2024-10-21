import React from 'react';
import {Modal} from 'react-bootstrap';
import parse from 'html-react-parser';
import Helper from "../../../utils/Helper";

const ProductDetail = ({show, handleClose, product}) => {
    const productImage = product?.images?.url || '';
    const productName = product?.name || 'N/A';
    const productSku = product?.sku || 'N/A';
    const productBrand = product?.brand?.name || 'N/A';
    const productCategory = product?.category?.name || 'N/A';
    const productConcentration = product?.concentration || 'N/A';
    const descriptionHtml = product?.description || '';

    const sortedDetails = product?.productDetails
        ? [...product.productDetails].sort((a, b) => a.volume - b.volume)
        : [];

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row p-4">
                    <div className="col-md-4 text-center">
                        <img src={productImage} alt="Product" className="img-fluid rounded"/>
                    </div>
                    <div className="col-md-8">
                        <h5 className="mb-3">{productName}</h5>
                        <div className="mb-3">
                            <p><strong>Mã Sản Phẩm:</strong> {productSku}</p>
                            <p><strong>Thương Hiệu:</strong> {productBrand}</p>
                            <p><strong>Phân Loại:</strong> {productCategory}</p>
                            <p><strong>Nồng Độ:</strong> {productConcentration}</p>
                        </div>
                        <h5 className="mb-3">Chi Tiết Sản Phẩm:</h5>
                        <div className='row'>
                            {sortedDetails.map((detail, index) => (
                                <div key={index} className="mb-2 border p-2 rounded bg-light col-5 me-2">
                                    <p className="mb-1"><strong>Dung Tích:</strong> {detail.volume} ml</p>
                                    <p className="mb-1"><strong>Số Lượng:</strong> {detail.stock}</p>
                                    <p className="mb-1"><strong>Giá:</strong> {Helper.formatPrice(detail.price)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <h5><strong>Mô tả:</strong></h5>
                    <div className="product-description border p-3 rounded bg-light">
                        {parse(descriptionHtml)}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ProductDetail;
