import Logout from "../../Component/auth/Logout";
import {Link} from "react-router-dom";
import Lottie from "lottie-react";
import avatar from "../../LottieData/avatar.json";
import {useState} from "react";

const UserMenu = ({isAuthenticated, user}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className="user-menu">
            {!isAuthenticated ? (
                <Link to="/login" className="text-black" aria-label="Login">
                    <i className="bi bi-person fs-4 ms-2"></i>
                </Link>
            ) : (
                <div className='p-0'>
                {isAuthenticated && (
                        <div className="d-flex align-items-center justify-content-between position-relative">
                            <div className='d-flex'>
                                <div className="user-menu__avatar-container" onClick={toggleDropdown}>
                                    <Lottie className="user-menu__avatar" animationData={avatar}/>
                                    <h6 className="user-menu__username m-0">chào {user?.name}</h6>
                                </div>
                                <div className={`user-menu__dropdown ${isDropdownOpen ? "show" : ""}`}>
                                    <ul>
                                        <li><i className="bi bi-person-circle"></i> Tài khoản của tôi</li>
                                        <li><i className="bi bi-gear"></i> Đổi mật khẩu</li>
                                        <Logout/>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
