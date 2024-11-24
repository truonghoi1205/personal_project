import { useSelector } from "react-redux";
import Logout from "../Auth/Logout";
import Lottie from "lottie-react";
import avatar from "../../LottieData/avatar.json";
import React, { useState } from "react";
import '../../style/scss/Admin.scss';

function NavAdmin() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen && isNotificationOpen) {
            setNotificationOpen(false);
        }
    };

    const toggleNotifications = () => {
        setNotificationOpen(!isNotificationOpen);
        if (!isNotificationOpen && isDropdownOpen) {
            setDropdownOpen(false);
        }
    };

    return (
        <div className='p-0'>
            {isAuthenticated && (
                <div className="d-flex align-items-center shadow-sm justify-content-between position-relative">
                    <p className='fs-3 m-0 ms-4'>...</p>
                    <div className='d-flex'>
                        <div
                            className={`d-flex align-items-center info-admin ${isDropdownOpen ? "active" : ""}`}
                            onClick={toggleDropdown}
                        >
                            <Lottie className="lottie-avatar" animationData={avatar}/>
                            <h6 className="mb-0 pe-3">
                                {user?.name}
                            </h6>
                        </div>
                        <div className={`dropdown-menu-admin ${isDropdownOpen ? "show" : ""}`}>
                            <ul className="list-unstyled">
                                <li><i className="bi bi-person-circle"></i> Tài khoản của tôi</li>
                                <li><i className="bi bi-gear"></i> Đổi mật khẩu</li>
                                <Logout/>
                            </ul>
                        </div>

                        <div className={`notification-icon px-3 py-2 ${isNotificationOpen ? 'active-icon' : ''}`}
                             onClick={toggleNotifications}>
                            <i className={`bi bi-bell-fill`}></i>
                            {/*số lượng thông báo*/}
                            <span className="notification-count">1</span>
                        </div>
                        {isNotificationOpen && (
                            <div className="notification-dropdown position-absolute">
                                <ul className="list-unstyled p-2">
                                    <li className="notification-item">Notification 1: New Order Received</li>
                                    <li className="notification-item">Notification 2: Account Updated</li>
                                    <li className="notification-item">Notification 3: New Message</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavAdmin;
