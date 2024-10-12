function Dashboard() {
    return (
        <div className='col-2 bg-dark text-light p-0 dashboard-sidebar'>
            <div className='border-bottom d-flex justify-content-center py-1'>
                <img src="/image/main-logo.png" alt="logo" style={{width: '80px'}}/>
            </div>
            <div className='dashboard-item'>
                <i className="bi bi-house"></i>
                <span className="ms-2">Tổng quan</span>
            </div>
            <div className='dashboard-item'>
                <i className="bi bi-card-list"></i>
                <span className="ms-2">Đơn hàng</span>
            </div>
            <div className='dashboard-item'>
                <i className="bi bi-truck"></i>
                <span className="ms-2">Vận chuyển</span>
            </div>
            <div className='dashboard-item'>
                <i className="bi bi-box-seam"></i>
                <span className="ms-2">Sản phẩm</span>
            </div>
            <div className='dashboard-item'>
                <i className="bi bi-person"></i>
                <span className="ms-2">Khách hàng</span>
            </div>
        </div>
    );
}

export default Dashboard;
