import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/scss/About.scss";

function About() {
    const [activeTab, setActiveTab] = useState("tab5");
    const [fade, setFade] = useState(true);

    const handleTabChange = (tab) => {
        setFade(false);
        setTimeout(() => {
            setActiveTab(tab);
            setFade(true);
        }, 150);
    };

    return (
        <section className="about-tab">
            <div className="bg-body-tertiary text-center p-5">
                <div className="container">
                    <h2>Về Stylish Online</h2>
                    <ul className="about-tab__nav">
                        <li className={`about-tab__nav-item ${activeTab === "tab5" ? "about-tab__nav-item--active" : ""}`} onClick={() => handleTabChange("tab5")}>
                            <Link to="#">
                                <span className="about-tab__nav-item-icon">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/shield-check.svg?v=6171" alt=""/>
                                </span>
                                <h4 className="text-black">100% Chính hãng</h4>
                            </Link>
                        </li>
                        <li className={`about-tab__nav-item ${activeTab === "tab6" ? "about-tab__nav-item--active" : ""}`} onClick={() => handleTabChange("tab6")}>
                            <Link to="#">
                                <span className="about-tab__nav-item-icon">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/gift.svg?v=6171" alt=""/>
                                </span>
                                <h4 className="text-black">Ưu đãi độc quyền</h4>
                            </Link>
                        </li>
                        <li className={`about-tab__nav-item ${activeTab === "tab7" ? "about-tab__nav-item--active" : ""}`} onClick={() => handleTabChange("tab7")}>
                            <Link to="#">
                                <span className="about-tab__nav-item-icon">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/credit-card.svg?v=6171" alt=""/>
                                </span>
                                <h4 className="text-black">Giao dịch an toàn và uy tín</h4>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="tabs-content-one">
                <div className={`container text-center py-5 ${fade ? 'about-tab--fade-in' : 'about-tab--fade-out'}`}>
                    {activeTab === "tab5" && (
                        <div className="about-tab__content-item d-block">
                            <h3>Bạn biết là bạn có thể tin chúng tôi</h3>
                            <p className="mt-4 m-auto">Cam Kết sản phẩm bán ra từ Stylish Online là hàng chính hãng 100%</p>
                        </div>
                    )}
                    {activeTab === "tab6" && (
                        <div className="about-tab__content-item d-block">
                            <h3>Hãy là người đầu tiên được biết</h3>
                            <p className="mt-4 m-auto">Nhiều hoạt động hợp tác cùng các thương hiệu danh tiếng và chương trình khuyến mại hấp dẫn chỉ dành riêng cho khách hàng của Stylish Online</p>
                        </div>
                    )}
                    {activeTab === "tab7" && (
                        <div className="about-tab__content-item d-block">
                            <h3>Phương thức thanh toán linh hoạt</h3>
                            <p className="mt-4 mb-0 m-auto">Giao dịch mua sắm tại Stylish Online luôn được đảm bảo an toàn về bảo mật thông tin, thuận tiện và uy tín về phương thức thanh toán.</p>
                            <p className="mt-2 m-auto">Stylish Online chấp nhận thanh toán bằng tiền mặt, chuyển khoản, các loại thẻ ATM, VISA, Master Card</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default About;
