import React from 'react';

function UploadImage() {
    const handleFileChange = (event) => {
        const files = event.target.files;
        console.log('Files selected:', files);
    };

    return (
        <label className="upload-container mt-3">
            <input
                type="file"
                className="file-input"
                onChange={handleFileChange}
            />
            <div className="upload-box">
                <i className="bi bi-cloud-arrow-up fs-1"></i>
                <p>Kéo thả ảnh vào đây</p>
            </div>
        </label>
    );
}

export default UploadImage;
