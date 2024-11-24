import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import ProductApi from "../../../Apis/ProductApi";
import Helper from "../../../utils/Helper";
import { fetchProducts } from "../../../Redux/product/productSlice";
import ProductForm from "./ProductForm";
import validationSchema from "./validationSchema";

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        concentration: "",
        season: "",
        brandId: "",
        categoryId: "",
        productDetails: [{ volume: '', stock: '', price: '' }],
        images: []
    });

    const handleImagesChange = (updatedImages) => {
        formik.setFieldValue("images", updatedImages);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await ProductApi.getProductById(id);
                setInitialValues({
                    name: product.data.name,
                    description: product.data.description,
                    concentration: product.data.concentration,
                    season: product.data.season,
                    brandId: product.data.brand.id,
                    categoryId: product.data.category.id,
                    productDetails: product.data.productDetails,
                    images: product.data.images || []
                });
            } catch (error) {
                Helper.toastError('Không thể tải sản phẩm!');
                navigate("/admin/products");
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const dataToSubmit = {
                    ...values,
                    brandId: values.brandId,
                    categoryId: values.categoryId
                };
                await ProductApi.updateProduct(id, dataToSubmit);
                Helper.toastSuccess('Cập nhật thành công!');
                dispatch(fetchProducts());
                navigate("/admin/products");
            } catch (error) {
                Helper.toastError('Cập nhật thất bại!');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Cập nhật sản phẩm</h4>
                <ProductForm
                    formik={formik}
                    isCreate={false}
                    images={initialValues.images}
                    onImagesChange={handleImagesChange} />
            </div>
        </div>
    );
}

export default ProductEdit;
