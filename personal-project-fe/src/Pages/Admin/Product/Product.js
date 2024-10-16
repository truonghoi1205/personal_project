import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchProducts} from "../../../Redux/product/productSlice";
import Lottie from "lottie-react";
import empty from "../../../LottieData/empty.json";

function ProductAdmin() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    return (
        <div className='shadow p-3 bg-body-tertiary rounded'>
            <div className='text-end'>
                <Link to='/admin/products/create'
                      className='hover-show-text btn btn-sm btn-outline-primary d-inline-flex text-nowrap align-items-center mb-3'>
                    <i className="bi bi-plus-lg"></i>
                    <span className='hv-text'>Thêm mới sản phẩm</span>
                </Link>
            </div>
            <table className="table table-hover bg-white">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Mã sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Thương hiệu</th>
                    <th>Phân loại</th>
                    <th>Nồng độ</th>
                    <th>Mùa</th>
                    <th></th>
                </tr>
                </thead>
                {products.length > 0 ? (
                    products.map((p, index) => (
                        <tbody key={index}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{p.sku}</td>
                            <td><img src={p.images?.url} alt="Product" style={{width: '30px'}}/></td>
                            <td className='text-start'>{p.name}</td>
                            <td className='text-start'>{p.brand.name}</td>
                            <td className='text-start'>{p.category.name}</td>
                            <td className='text-start'>{p.concentration}</td>
                            <td className='text-start'>{p.session}</td>
                            <td>
                                <Link to={`/admin/products/detail/${p.id}`}>
                                    <i className="bi bi-info-circle"></i>
                                </Link>
                                <Link to={`/admin/products/update/${p.id}`} className='mx-2'>
                                    <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link to={`/admin/products/delete/${p.id}`}>
                                    <i className="bi bi-trash3"></i>
                                </Link>
                            </td>
                        </tr>
                        </tbody>
                    ))
                ) : (
                    <div className='lottie-container'>
                        <Lottie animationData={empty} style={{width: '400px', margin: 'auto'}}/>
                        <p className='fs-3'>Không có sản phẩm nào!!!</p>
                    </div>
                )}
            </table>
        </div>
    );
}

export default ProductAdmin;
