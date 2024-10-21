import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../../../Component/Pagination";
import ProductDetails from "../../../Component/admin/ProductDetails";

function ProductList({
                         products,
                         currentProducts,
                         currentPage,
                         productsPerPage,
                         setCurrentPage,
                         handleShowDetail,
                         handleDelete,
                     }) {
    return (
        <>
            <table className="table table-hover bg-white">
                <thead>
                <tr>
                    <th>Mã sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Thương hiệu</th>
                    <th>Phân loại</th>
                    <th>Nồng độ</th>
                    <th>Dung tích</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.map((p, index) => (
                    <tr key={index}>
                        <td>{p.sku}</td>
                        <td>
                            <img
                                src={p.images?.url}
                                alt="Product"
                                style={{ width: "30px" }}
                            />
                        </td>
                        <td className="text-start">{p.name}</td>
                        <td className="text-start">{p.brand.name}</td>
                        <td>{p.category.name}</td>
                        <td>{p.concentration}</td>
                        <ProductDetails productDetails={p.productDetails} />
                        <td className="align-items-center">
                            <Button
                                variant="link"
                                onClick={() => handleShowDetail(p)}
                                className="p-0 fs-6 align-baseline"
                            >
                                <i className="bi bi-info-circle"></i>
                            </Button>
                            <Link to={`/admin/products/update/${p.id}`} className="mx-2">
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                            <Button
                                variant="link"
                                onClick={() => handleDelete(p.id)}
                                className="p-0 fs-6 align-baseline"
                            >
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
    );
}

export default ProductList;
