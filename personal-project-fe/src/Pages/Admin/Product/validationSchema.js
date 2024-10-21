import * as Yup from "yup";

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
    ).required('Chi tiết sản phẩm là bắt buộc').min(1, 'Phải có ít nhất một chi tiết sản phẩm'),
    images: Yup.array().of(Yup.string().url("Đường dẫn không hợp lệ")).nullable(),
});

export default validationSchema;
