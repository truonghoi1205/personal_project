import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cloudinaryConfig from '../../config/cloudinaryConfig';

function UploadImage({ onImagesChange, initialImages }) {
    const [error, setError] = useState('');
    const [previewImages, setPreviewImages] = useState([]);

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'perfumeIamge');

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
            formData
        );
        return response.data.secure_url;
    };

    const handleChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length + previewImages.length > 5) {
            setError('Chỉ được tải lên tối đa 5 ảnh.');
            return;
        }

        const newPreviews = files.map((file) => ({
            src: URL.createObjectURL(file),
            file,
            uploaded: false,
        }));
        setPreviewImages((prev) => [...prev, ...newPreviews]);
        try {
            const urls = await Promise.all(files.map(handleUpload));
            console.log('Uploaded URLs:', urls);
            const allImages = [
                ...previewImages.filter((p) => p.uploaded).map((p) => p.src),
                ...urls
            ];
            onImagesChange(allImages);
            setPreviewImages((prev) =>
                prev.map((preview) =>
                    preview.uploaded ? preview : { ...preview, uploaded: true }
                )
            );
        } catch {
            setError('Có lỗi xảy ra trong quá trình tải lên.');
        }
    };

    const handleRemove = (index) => {
        const updatedPreviews = previewImages.filter((_, i) => i !== index);
        setPreviewImages(updatedPreviews);
        const uploadedUrls = updatedPreviews
            .filter(preview => preview.uploaded)
            .map(preview => preview.src);
        console.log(uploadedUrls);
        onImagesChange(uploadedUrls);
    };

    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            const existingPreviews = initialImages.map((image) => ({
                src: image.url,
                uploaded: true,
            }));
            setPreviewImages(existingPreviews);
        }
    }, [initialImages]);

    return (
        <div>
            <label className="upload-container mt-3">
                <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                />
                <div className="upload-box">
                    <i className="bi bi-cloud-arrow-up fs-1"></i>
                    <p>Kéo thả ảnh vào đây hoặc nhấp để chọn</p>
                </div>
            </label>

            <div className="preview-container mt-3 d-flex flex-wrap">
                {previewImages.map((preview, index) => (
                    <div
                        key={index}
                        className="position-relative me-2 mb-2"
                        style={{ width: '100px', height: '100px' }}
                    >
                        <img
                            src={preview.src}
                            alt={`preview-${index}`}
                            className="img-thumbnail"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                            type="button"
                            className="btn btn-sm position-absolute"
                            style={{ top: '1px', right: '1px' }}
                            onClick={() => handleRemove(index)}
                        >
                            <i className="bi bi-x"></i>
                        </button>
                        {!preview.uploaded && (
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-50">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Đang tải...</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {error && <div className="text-danger text-center mt-2">{error}</div>}
        </div>
    );
}

export default UploadImage;
