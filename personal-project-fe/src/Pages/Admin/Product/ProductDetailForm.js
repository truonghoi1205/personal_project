function ProductDetailForm({ formik }) {
    const handleAddDetail = () => {
        formik.setFieldValue("productDetails", [
            ...formik.values.productDetails,
            { volume: '', stock: '', price: '' }
        ]);
    };

    const handleRemoveDetail = (index) => {
        const updatedDetails = [...formik.values.productDetails];
        updatedDetails.splice(index, 1);
        formik.setFieldValue("productDetails", updatedDetails);
    };

    return (
        <div className='mt-3'>
            {formik.values.productDetails.map((detail, index) => (
                <div key={index} className='mb-3 position-relative'>
                    {formik.values.productDetails.length > 1 && index !== 0 && (
                        <div className='text-end'>
                            <button type="button" onClick={() => handleRemoveDetail(index)} className="btn btn-danger btn-sm mb-2">
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    )}
                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className='form-control border-end-0'
                            placeholder="Dung tích"
                            name={`productDetails[${index}].volume`}
                            onChange={formik.handleChange}
                            value={detail.volume}
                        />
                        <span className="input-group-text border-start-0 bg-body text-black-50">ml</span>
                    </div>
                    {formik.touched.productDetails && formik.touched.productDetails[index]?.volume && formik.errors.productDetails && (
                        <div className="text-danger">{formik.errors.productDetails[index].volume}</div>
                    )}

                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Số lượng"
                            name={`productDetails[${index}].stock`}
                            onChange={formik.handleChange}
                            value={detail.stock}
                        />
                    </div>
                    {formik.touched.productDetails && formik.touched.productDetails[index]?.stock && formik.errors.productDetails && (
                        <div className="text-danger">{formik.errors.productDetails[index].stock}</div>
                    )}

                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className='form-control border-end-0'
                            placeholder="Giá"
                            name={`productDetails[${index}].price`}
                            onChange={formik.handleChange}
                            value={detail.price}
                        />
                        <span className="input-group-text border-start-0 bg-body text-black-50">VNĐ</span>
                    </div>
                    {formik.touched.productDetails && formik.touched.productDetails[index]?.price && formik.errors.productDetails && (
                        <div className="text-danger">{formik.errors.productDetails[index].price}</div>
                    )}
                </div>
            ))}
                <div className='text-end'>
                    <button type="button" onClick={handleAddDetail} className="btn btn-primary btn-sm">Thêm chi tiết</button>
                </div>
        </div>
    );
}

export default ProductDetailForm;
