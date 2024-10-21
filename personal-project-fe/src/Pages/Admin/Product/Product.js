import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../../Redux/product/productSlice";
import Lottie from "lottie-react";
import empty from "../../../LottieData/empty.json";
import ProductDelete from "./ProductDelete";
import {  Spinner } from "react-bootstrap";
import Helper from "../../../utils/Helper";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import ProductSearch from "./ProductSearch";

function ProductAdmin() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 7;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    const handleDelete = (id) => {
        setProductIdToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (productIdToDelete) {
            dispatch(deleteProduct(productIdToDelete));
            setShowDeleteModal(false);
            setProductIdToDelete(null);
            Helper.toastSuccess("Xoá thành công");
        }
    };

    const handleShowDetail = (product) => {
        setProductDetail(product);
        setShowDetailModal(true);
    };

    const handleCloseDetail = () => setShowDetailModal(false);
    const handleCloseDelete = () => setShowDeleteModal(false);

    return (
        <div>
            <div className="shadow p-3 bg-body-tertiary rounded">
                <div className="d-flex justify-content-between mb-3">
                    <ProductSearch/>
                    <Link
                        to={"/admin/products/new"}
                        className="hover-show-text btn btn-sm btn-outline-primary d-inline-flex text-nowrap align-items-center"
                    >
                        <i className="bi bi-plus-lg"></i>
                        <span className="hv-text">Thêm mới sản phẩm</span>
                    </Link>
                </div>

                {status === "loading" ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Đang tải dữ liệu...</p>
                    </div>
                ) : products.length > 0 ? (
                    <ProductList
                        products={products}
                        currentProducts={currentProducts}
                        currentPage={currentPage}
                        productsPerPage={productsPerPage}
                        setCurrentPage={setCurrentPage}
                        handleShowDetail={handleShowDetail}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <div className="text-center pb-5">
                        <Lottie animationData={empty} style={{ width: "400px", margin: "auto" }} />
                        <p className="fs-3">Không có sản phẩm nào!!!</p>
                    </div>
                )}
                <Outlet />
            </div>
            <ProductDelete
                showModal={showDeleteModal}
                handleClose={handleCloseDelete}
                productIdToDelete={productIdToDelete}
                confirmDelete={confirmDelete}
            />
            <ProductDetail
                show={showDetailModal}
                handleClose={handleCloseDetail}
                product={productDetail}
            />
        </div>
    );
}

export default ProductAdmin;
