import {Flip, toast} from "react-toastify";

class Helper {
    static customStylesSelect = {
        control: (provided) => ({
            ...provided,
            height: '54px',
            minHeight: '54px',
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: '54px',
            display: 'flex',
            alignItems: 'center',
        }),
    }

    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static toastSuccess(message) {
        toast.success(message, {
            position: "bottom-right", // vị trí toast
            autoClose: 5000, // thời gian hiển thị
            hideProgressBar: false, //Xác định có hiển thị thanh tiến trình (progress bar) ở dưới toast hay không.
            closeOnClick: true, //Xác định nếu toast có thể bị đóng khi người dùng click vào nó hay không.
            pauseOnHover: true, //Xác định có tạm dừng (hoãn lại) việc đóng toast khi người dùng di chuột vào nó hay không.
            draggable: true, //Xác định nếu người dùng có thể kéo toast xung quanh màn hình hay không.
            progress: undefined, //Xác định tỷ lệ hoàn thành của thanh tiến trình.
            theme: "colored", //Xác định giao diện của toast.
            transition: Flip, //Xác định hiệu ứng chuyển tiếp khi toast xuất hiện và biến mất.
        });
    }

    static toastError(message) {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
        });
    }

    static formatPrice(price) {
        return price.toLocaleString("vi-VN", {style: "currency", currency: "VND"});
    }

    static showApiError(data) {
        let message = "";
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                message += `${key}: ${data[key]}, `;
            }
        }
        Helper.toastError(message);
    }

    static parseError(error) {
        console.log(error);
        if(error.code === "ERR_NETWORK") {
            Helper.toastError("Lỗi mạng hoặc server không hoạt động!");
            return;
        }
        if(error.response && error.response.data && error.response.data.message) {
            Helper.toastError(error.response.data.message);
            return;
        }
        if (error.response && error.response.data) {
            let mes = Object.values(error.response.data).join("");
            Helper.toastError(mes);
        }
    }

    static formatNumber(value) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            maximumFractionDigits: 2,
        }).format(value);
    };

    static parseNumber(value) {
        return value.replace(/\./g, '').replace(/,/g, '') // Remove commas for numeric parsing
    };

    static parseFloat(value) {
        return Number.parseFloat(value.replace(',', ''));
    }

    static getAbbreviation(name) {
        const words = name.split(" ");
        return words.map(word => word.charAt(0).toUpperCase()).join(""); // Lấy ký tự đầu của mỗi từ
    }

    static formatUrl = (name) => {
        const normalizedStr = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
        return normalizedStr.toLowerCase().replace(/ /g, '-');
    };


}

export default Helper;