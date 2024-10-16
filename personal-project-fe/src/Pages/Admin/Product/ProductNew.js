// ProductNew.js
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ProductApi from "../../../Apis/ProductApi";
import Helper from "../../../utils/Helper";
import { fetchProducts } from "../../../Redux/product/productSlice";
import ProductForm from "./ProductForm";

const validationSchema = Yup.object({
    name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    concentration: Yup.string().required('Nồng độ là bắt buộc'),
    categoryId: Yup.number().required('Phân loại là bắt buộc'),
    brandId: Yup.number().required('Thương hiệu là bắt buộc'),
    productDetails: Yup.array().of(
        Yup.object().shape({
            volume: Yup.number().required('Dung tích là bắt buộc'),
            stock: Yup.number().required('Số lượng là bắt buộc'),
            price: Yup.number().required('Giá là bắt buộc'),
        })
    ),
    images: Yup.array().of(Yup.string().url("Đường dẫn không hợp lệ")),
});

function ProductNew() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            concentration: "",
            session: "",
            brandId: "",
            categoryId: "",
            productDetails: [{ volume: '', stock: '', price: '' }],
            images: []
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await ProductApi.createProduct(values);
                Helper.toastSuccess('Thêm mới thành công!');
                dispatch(fetchProducts());
                navigate("/admin/products");
            } catch (error) {
                Helper.toastError('Thêm mới thất bại!');
            } finally {
                setSubmitting(false);
            }
        },
        validateOnMount: false
    });

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Thêm mới sản phẩm</h4>
                <ProductForm formik={formik}/>
            </div>
        </div>
    );
}

export default ProductNew;
