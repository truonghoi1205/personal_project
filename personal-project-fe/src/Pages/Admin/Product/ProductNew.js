import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ProductApi from "../../../Apis/ProductApi";
import Helper from "../../../utils/Helper";
import { fetchProducts } from "../../../Redux/product/productSlice";
import ProductForm from "./ProductForm";
import validationSchema from "./validationSchema";

function ProductNew() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            concentration: "",
            season: "",
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
                console.log(error)
                Helper.toastError('Thêm mới thất bại!');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Thêm sản phẩm</h4>
                <ProductForm formik={formik} isCreate={true} />
            </div>
        </div>
    );
}

export default ProductNew;
