import React, { useState } from 'react';
import axios from 'axios';
import cloudinaryConfig from "../config/cloudinaryConfig";
import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({ cloud_name: cloudinaryConfig.cloudName });

function UploadImage() {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpload = async (file) => {
        if (!file) {
            setError('Vui lòng chọn một hình ảnh.');
            return;
        }
        setError('');
        setSuccess('');
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'perfumeIamge');

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
                formData
            );
            const uploadedUrl = response.data.secure_url;
            console.log(uploadedUrl);
            const transformedUrl = cloudinary.url(response.data.public_id, {
                width: 150,
                height: 150,
                crop: 'fill',
                gravity: 'center',
                fetch_format: 'auto'
            });
            setUrls((prevUrls) => [...prevUrls, transformedUrl]);
            setSuccess('Tải lên thành công!');
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Có lỗi xảy ra trong quá trình tải lên.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setUrls([]); // Reset URLs khi chọn tệp mới
        files.forEach(handleUpload); // Tải lên từng tệp
    };

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
                {error && <div className="text-danger">{error}</div>}
                {success && <div className="text-success">{success}</div>}
            </label>
            {loading && <div className="text-info">Đang tải lên...</div>}
            <div className="mt-3">
                {urls.map((url, index) => (
                    <img key={index} src={url} alt={`Uploaded ${index}`} className="mt-2" />
                ))}
            </div>
        </div>
    );
}

export default UploadImage;
