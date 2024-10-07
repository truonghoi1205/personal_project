import { Link } from "react-router-dom";
import '../../style/scss/Footer.scss';

function Footer() {
    return (
        <div className="footer">
            <div className="container footer-container">
                <div className="row footer-row mx-3 pt-4 pb-3">
                    <div className="col-3 footer-column">
                        <div>
                            <h5>Stylish Online Store</h5>
                            <div className="d-inline-grid mt-2">
                                <Link to="#" className="link-footer"><small>Giới thiệu</small></Link>
                                <Link to="#" className="link-footer"><small>Liên hệ</small></Link>
                                <Link to="#" className="link-footer"><small>Tuyển dụng</small></Link>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h6>Ngôn ngữ</h6>
                            <div className="mt-2">
                                <div className="footer-language">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/united-states.svg?v=6171" alt="united states" />
                                    <small> Tiếng Anh</small>
                                </div>
                                <div className="footer-language mt-1">
                                    <img src="//theme.hstatic.net/1000340570/1000964732/14/vietnam.svg?v=6171" alt="vietnam" />
                                    <small> Tiếng Việt</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 footer-column">
                        <h6>Hỗ trợ</h6>
                        <div className="d-inline-grid mt-2">
                            <Link to="#" className="link-footer"><small>Các câu hỏi thường gặp</small></Link>
                            <Link to="#" className="link-footer"><small>Cách thức mua hàng</small></Link>
                            <Link to="#" className="link-footer"><small>Hướng dẫn đặt hàng</small></Link>
                            <Link to="#" className="link-footer"><small>Phương thức vận chuyển</small></Link>
                            <Link to="#" className="link-footer"><small>Phương thức thanh toán</small></Link>
                            <Link to="#" className="link-footer"><small>Theo dõi đơn hàng</small></Link>
                            <Link to="#" className="link-footer"><small>Chính sách giá cả</small></Link>
                            <Link to="#" className="link-footer"><small>Chính sách đổi trả</small></Link>
                            <Link to="#" className="link-footer"><small>Chính sách bảo mật</small></Link>
                        </div>
                    </div>
                    <div className="col-2 footer-column">
                        <h6>Theo dõi chung tôi</h6>
                        <div className="d-inline-grid mt-2">
                            <Link to="#" className="link-footer footer-social">
                                <img src="/image/instagram-svgrepo-com.svg" alt="insta" />
                                <small> Instagram</small>
                            </Link>
                            <Link to="#" className="link-footer footer-social">
                                <img src="/image/facebook-svgrepo-com.svg" alt="facebook" />
                                <small> Facebook</small>
                            </Link>
                            <Link to="#" className="link-footer footer-social">
                                <img src="/image/tiktok-outline-svgrepo-com.svg" alt="tiktok" />
                                <small> Tiktok</small>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 footer-column">
                        <h3>Nơi mùi hương là bạn đồng hành</h3>
                        <div className="footer-subscription">
                            <p>Đăng ký thông báo và nhận tin</p>
                            <div className="d-flex">
                                <input type="text" placeholder="Nhập email của bạn" className="form-control form-control-sm" />
                                <button className='btn btn-sm btn-light ms-2'>Gửi</button>
                            </div>
                            <div className="mt-3">
                                <b>Địa chỉ cửa hàng: <small className="fw-normal"> 420/6 Lê Văn Sỹ, Phường 14, Quận 3, TP. Hồ Chí Minh</small></b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
