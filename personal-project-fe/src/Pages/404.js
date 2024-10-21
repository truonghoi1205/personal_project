import Lottie from "lottie-react";
import notFound from "../LottieData/notFound.json"
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div className="container w-50 text-center my-5">
            <Lottie animationData={notFound}/>
            <h5 className="notFound mb-3">Ối! Trang bạn đang tìm kiếm không tồn tại.</h5>
            <button className='btn btn-outline-dark fw-bold' style={{padding: 10}} onClick={handleNavigateHome}>
                <span>Trở về trang chủ</span> <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    );
}

export default NotFound;