import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../../Redux/brand/brandSlice";
import { fetchCategories } from "../../../Redux/category/categorySlice";
import ProductDetailForm from "./ProductDetailForm";
import CustomSelect from "../../../Component/CustomSelect";
import UploadImage from "../../../Component/image/UploadImage";
import QuillEditor from "../../../Component/QuillEditor";

function ProductForm({ formik, isCreate = false, images }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(formik.values.description);
    }, [formik.values.description]);

    const handleDescriptionChange = (content) => {
        setDescription(content);
        formik.setFieldValue('description', content);
    };

    useEffect(() => {
        if (!categories.length) dispatch(fetchCategories());
        if (!brands.length) dispatch(fetchBrands());
    }, [dispatch, categories, brands]);

    const categoryOptions = categories.map((c) => ({
        value: c.id, label: c.name,
    }));
    const brandOptions = brands.map((b) => ({
        value: b.id, label: b.name,
    }));

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
                <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên sản phẩm"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                    <div className="row mt-3">
                        <CustomSelect
                            options={brandOptions}
                            value={formik.values.brandId}
                            onChange={(selected) => formik.setFieldValue('brandId', selected)}
                            placeholder="Chọn thương hiệu"
                            error={formik.touched.brandId && formik.errors.brandId}
                        />
                        <CustomSelect
                            options={categoryOptions}
                            value={formik.values.categoryId}
                            onChange={(selected) => formik.setFieldValue('categoryId', selected)}
                            placeholder="Chọn phân loại"
                            error={formik.touched.categoryId && formik.errors.categoryId}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Nồng độ"
                            name="concentration"
                            onChange={formik.handleChange}
                            value={formik.values.concentration}
                        />
                        {formik.touched.concentration && formik.errors.concentration && (
                            <div className="text-danger">{formik.errors.concentration}</div>
                        )}
                    </div>
                    <div className="mt-3">
                        <select
                            name="season"
                            className="form-select"
                            value={formik.values.season}
                            onChange={formik.handleChange}>
                            <option value="">Chọn mùa</option>
                            <option value="xuân">Xuân</option>
                            <option value="hạ">Hạ</option>
                            <option value="thu">Thu</option>
                            <option value="đông">Đông</option>
                        </select>
                        {formik.touched.season && formik.errors.season && (
                            <div className="text-danger">{formik.errors.season}</div>
                        )}
                    </div>
                    <ProductDetailForm formik={formik}/>
                </div>

                <div className="col-6">
                    <QuillEditor
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Nhập mô tả sản phẩm..."
                    />
                    <UploadImage
                        onImagesChange={(images) => {
                            formik.setFieldValue('images', images);
                        }}
                        initialImages={!isCreate ? images: []}
                    />
                    {formik.touched.images && formik.errors.images && (
                        <div className="text-danger">{formik.errors.images}</div>
                    )}
                </div>
            </div>

            <div className="text-end">
                <Link to={"/admin/products"} className="btn btn-secondary btn-sm">Huỷ</Link>
                <button
                    type="submit"
                    className="btn btn-primary mx-2 px-4 btn-sm"
                    disabled={formik.isSubmitting}
                >
                    {isCreate ? 'Thêm mới' : 'Cập nhật'}
                </button>
            </div>
        </form>
    );
}

export default ProductForm;
