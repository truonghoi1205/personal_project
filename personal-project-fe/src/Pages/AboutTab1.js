import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/scss/About.scss";

function AboutTab1() {
    const [activeTab, setActiveTab] = useState("tab1");
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
                        <li className={`about-tab__nav-item ${activeTab === "tab1" ? "about-tab__nav-item--active" : ""}`}
                            onClick={() => handleTabChange("tab1")}>
                            <Link to="#">
                                <span className="about-tab__nav-item-icon">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/icon-chat.svg?v=6171"
                                         alt=""/>
                                </span>
                                <h4 className="text-black">Tư vẫn online</h4>
                            </Link>
                        </li>
                        <li className={`about-tab__nav-item ${activeTab === "tab2" ? "about-tab__nav-item--active" : ""}`}
                            onClick={() => handleTabChange("tab2")}>
                            <Link to="#">
                                <span className="about-tab__nav-item-icon">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/icon-truck-large.svg?v=6171" alt=""/>
                                </span>
                                <h4 className="text-black">Freeship toàn quốc</h4>
                            </Link>
                        </li>
                        <li className={`about-tab__nav-item ${activeTab === "tab3" ? "about-tab__nav-item--active" : ""}`}
                            onClick={() => handleTabChange("tab3")}>
                            <Link to="#">
                                <span className="about-tab__nav-item-icon">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/gift.svg?v=6171"
                                         alt=""/>
                                </span>
                                <h4 className="text-black">Dịch vụ quà tặng</h4>
                            </Link>
                        </li>
                        <li className={`about-tab__nav-item ${activeTab === "tab4" ? "about-tab__nav-item--active" : ""}`}
                            onClick={() => handleTabChange("tab4")}>
                            <Link to="#">
                                <span className="about-tab__nav-item-icon">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/return.svg?v=6171"
                                         alt=""/>
                                </span>
                                <h4 className="text-black">Đổi trả miễn phí</h4>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tabs-content-one">
                <div className={`container text-center py-5 ${fade ? 'about-tab--fade-in' : 'about-tab--fade-out'}`}>
                    {activeTab === "tab1" && (
                        <div className="about-tab__content-item d-block">
                            <h3>Chuyên Viên Tư vấn Nước hoa Stylish Online</h3>
                            <p className="mt-4 m-auto">Các chuyên viên tư vấn nước hoa của Stylish Online luôn sẵn sàng hỗ trợ khách hàng từ hotline, tin nhắn website và email một cách nhanh nhất.</p>
                        </div>
                    )}
                    {activeTab === "tab2" && (
                        <div className="about-tab__content-item d-block">
                            <h3>Ship Nhanh Miễn Phí</h3>
                            <p className="mt-4 m-auto"><strong>Đà Nẵng</strong></p>
                            <p className="mt-2 m-auto">Đơn hàng sẽ được đóng gói cẩn thận và ship tới khách hàng trong vòng 2h nội thành từ 9h sáng tới 21h tối.</p>
                            <p className="mt-3 m-auto"><strong>Toàn Quốc</strong></p>
                            <p className="mt-2 m-auto">Đơn hàng sẽ được đóng gói cẩn thận bằng nhiều lớp chống sốc kèm hộp đựng của Stylish Online được dán tem niêm phong, đảm bảo sự an toàn cho sản phẩm trong quá trình vận chuyển từ 2-4 ngày khi đến tay khách hàng.</p>
                        </div>
                    )}
                    {activeTab === "tab3" && (
                        <div className="about-tab__content-item d-block">
                            <h3>Gửi Gắm Sự Tận Tâm</h3>
                            <p className="mt-4 mb-0 m-auto">Stylish Online cung cấp dịch vụ tư vấn hộp quà, viết thiệp và đóng gói để món quà của bạn trở nên thật ý nghĩa.</p>
                        </div>
                    )}
                    {activeTab === "tab4" && (
                        <div className="about-tab__content-item d-block">
                            <h3>Bạn đổi ý ? Không sao cả</h3>
                            <p className="mt-4 mb-0 m-auto">Với những sản phẩm chưa bung seal và sử dụng, bạn có thể dễ dàng đổi trả miễn phí trong vòng 7 ngày. Tìm hiểu thêm về quy trình đổi trả hàng hoá tại phần câu hỏi thường gặp.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
export default AboutTab1;
