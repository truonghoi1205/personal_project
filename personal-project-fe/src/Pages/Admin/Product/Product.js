import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts, deleteProduct, fetchProductById} from "../../../Redux/product/productSlice";
import Lottie from "lottie-react";
import empty from "../../../LottieData/empty.json";
import Pagination from "../../../Component/Pagination";
import ProductDetails from "../../../Component/admin/ProductDetails";
import FormDelete from "./FormDelete";
import { Button, Spinner } from 'react-bootstrap';
import Helper from "../../../utils/Helper";
import ProductDetail from "./ProductDetail";

function ProductAdmin() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 7;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const [showModal, setShowModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    const handleDelete = (id) => {
        setProductIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (productIdToDelete) {
            dispatch(deleteProduct(productIdToDelete));
            setShowModal(false);
            setProductIdToDelete(null);
            Helper.toastSuccess('Xoá thành công');
        }
    };
    const handleShowDetail = (product) => {
        setProductDetail(product);
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);
    return (
        <div>
            <div className='shadow p-3 bg-body-tertiary rounded'>
                <div className='text-end'>
                    <Link
                        to={'/admin/products/new'}
                        className='hover-show-text btn btn-sm btn-outline-primary d-inline-flex text-nowrap align-items-center mb-3'>
                        <i className="bi bi-plus-lg"></i>
                        <span className='hv-text'>Thêm mới sản phẩm</span>
                    </Link>
                </div>

                {status === "loading" ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Đang tải dữ liệu...</p>
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <table className="table table-hover bg-white">
                            <thead>
                            <tr>
                                <th>Mã sản phẩm</th>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Thương hiệu</th>
                                <th>Phân loại</th>
                                <th>Dung tích</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Nồng độ</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentProducts.map((p, index) => (
                                <tr key={index}>
                                    <td>{p.sku}</td>
                                    <td><img src={p.images?.url} alt="Product" style={{ width: '30px' }} /></td>
                                    <td className='text-start'>{p.name}</td>
                                    <td className='text-start'>{p.brand.name}</td>
                                    <td>{p.category.name}</td>
                                    <ProductDetails productDetails={p.productDetails} />
                                    <td className='text-start'>{p.concentration}</td>
                                    <td className='align-items-center'>
                                        <Button variant="link" onClick={() => handleShowDetail(p)} className="p-0 fs-6 align-baseline">
                                            <i className="bi bi-info-circle"></i>
                                        </Button>
                                        <Link to={`/admin/products/update/${p.id}`} className="mx-2">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <Button variant="link" onClick={() => handleDelete(p.id)} className="p-0 fs-6 align-baseline">
                                            <i className="bi bi-trash3"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination
                            totalProducts={products.length}
                            productsPerPage={productsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                ) : (
                    <div className="text-center pb-5">
                        <Lottie animationData={empty} style={{ width: '400px', margin: 'auto' }} />
                        <p className='fs-3'>Không có sản phẩm nào!!!</p>
                    </div>
                )}
                <Outlet />
            </div>
            <FormDelete
                showModal={showModal}
                handleClose={handleClose}
                productIdToDelete={productIdToDelete}
                confirmDelete={confirmDelete}
            />
            <ProductDetail
                show={showModal}
                handleClose={handleClose}
                product={productDetail}
            />
        </div>
    );
}

export default ProductAdmin;
