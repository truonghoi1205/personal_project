import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchBrands} from "../../../Redux/brand/brandSlice";
import {fetchCategories} from "../../../Redux/category/categorySlice";
import ProductDetailForm from "./ProductDetailForm";
import CustomSelect from "../../../Component/CustomSelect";
import UploadImage from "../../../Component/UploadImage";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ProductForm({formik}) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);
    const [value, setValue] = useState('');

    const handleChange = (content) => {
        setValue(content);
        formik.setFieldValue('description', content);
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());

        if (formik.values.productDetails.length === 0) {
            formik.setFieldValue("productDetails", [{volume: '', stock: '', price: ''}]);
        }
    }, [dispatch, formik]);

    const categoryOptions = categories.map((c) => ({
        value: c.id, label: c.name,
    }));
    const brandOptions = brands.map((b) => ({
        value: b.id, label: b.name,
    }));

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='row mb-3'>
                <div className='col-6'>
                    <div>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Tên sản phẩm"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name="name"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-danger">{formik.errors.name}</div>
                        )}
                    </div>
                    <div className='row mt-3'>
                        <CustomSelect
                            options={brandOptions}
                            onChange={(option) => formik.setFieldValue("brandId", option?.value || "")}
                            value={brandOptions.find((b) => b.value === formik.values.brandId)}
                            placeholder="Chọn thương hiệu"
                            error={formik.touched.brandId && formik.errors.brandId}
                        />
                        <CustomSelect
                            options={categoryOptions}
                            onChange={(option) => formik.setFieldValue("categoryId", option?.value || "")}
                            value={categoryOptions.find((c) => c.value === formik.values.categoryId)}
                            placeholder="Chọn phân loại"
                            error={formik.touched.categoryId && formik.errors.categoryId}
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Nồng độ"
                            name="concentration"
                            onChange={formik.handleChange}
                            value={formik.values.concentration}
                        />
                        {formik.touched.concentration && formik.errors.concentration && (
                            <div className="text-danger">{formik.errors.concentration}</div>
                        )}
                    </div>
                    <ProductDetailForm formik={formik} handleRemoveDetail/>
                </div>
                <div className='col-6'>
                    <div>
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={handleChange}
                            placeholder="Nhập mô tả sản phẩm..."
                        />
                    </div>
                    <div>
                        <UploadImage/>
                    </div>
                </div>
            </div>
            <div className="text-end">
                <Link to={"/admin/products"} className="btn btn-secondary btn-sm">Huỷ</Link>
                <button type="submit" className="btn btn-primary mx-2 px-4 btn-sm" disabled={formik.isSubmitting}>
                    Thêm mới
                </button>
            </div>
        </form>
    );
}

export default ProductForm;
