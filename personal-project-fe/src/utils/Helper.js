import {Flip, toast} from "react-toastify";

class Helper {
    static customStylesSelect = {
        control: (provided) => ({
            ...provided,
            height: '54px',  // Set the desired height
            minHeight: '54px',  // Ensure the height is not less than this value
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: '54px',  // Match the height of the control
            display: 'flex',
            alignItems: 'center',
        }),
    }
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static toastSuccess(message) {
        toast.success(message, {
            position: "top-right",
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
    static toastError(message) {
        toast.error(message, {
            position: "top-right",
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
        if (error.response.data) {
            let mes = "";
            for (const [key, value] of Object.entries(error.response.data)) {
                mes += `${value}.`;

            }
            Helper.toastError(mes)
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
        //value is "24,870.00"
        return Number.parseFloat(value.replace(',', ''));
    }

}

export default Helper;