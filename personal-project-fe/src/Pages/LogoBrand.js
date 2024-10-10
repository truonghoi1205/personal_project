import { Link } from "react-router-dom";
import "../style/scss/Brand.scss";

function LogoBrand() {
    return (
        <div id="brand-container" className="app-brand container my-5">
            <h3 id="brand-title" className="app-brand__title text-center">Thương hiệu nổi tiếng</h3>
            <div className="row border-bottom mt-5">
                <div className="col-2 app-brand__column">
                    <Link to="#">
                        <img src="/image/Nuoc-hoa-Clive-Christian.png" alt="Clive Christian" className="app-brand__logo"/>
                    </Link>
                    <Link to="#">
                        <img src="/image/Nuoc-hoa-Ex-Nihilo.png" alt="Ex Nihilo" className="app-brand__logo"/>
                    </Link>
                </div>
                <div className="col-2 app-brand__column">
                    <Link to="#">
                        <img src="/image/Nuoc-hoa-Xerjoff.png" alt="Xerjoff" className="app-brand__logo"/>
                    </Link>
                    <Link to="#">
                        <img src="/image/159133030_1044233219399119_4321418372070751780_n.png" alt="Creed" className="app-brand__logo"/>
                    </Link>
                </div>
                <div className="col-2 app-brand__column">
                    <Link to="#">
                        <img src="/image/nuoc-hoa-le-labo.png" alt="Lelabo" className="app-brand__logo"/>
                    </Link>
                    <Link to="#">
                        <img src="/image/nuoc-hoa-tomford.png" alt="Tom Ford" className="app-brand__logo"/>
                    </Link>
                </div>
                <div className="col-2 app-brand__column">
                    <Link to="#">
                        <img src="/image/Hang-nuoc-hoa-Zoologist.png" alt="Zoologist" className="app-brand__logo"/>
                    </Link>
                    <Link to="#">
                        <img src="/image/Logo-Carner-Barcelnoa.png" alt="Carner Barcelona" className="app-brand__logo"/>
                    </Link>
                </div>
                <div className="col-2 app-brand__column">
                    <Link to="#">
                        <img src="/image/Orto-Parisi.png" alt="Orto Parisi" className="app-brand__logo"/>
                    </Link>
                    <Link to="#">
                        <img src="/image/Nasomatto.png" alt="Nasomatto" className="app-brand__logo"/>
                    </Link>
                </div>
                <div className="col-2 app-brand__column">
                    <Link to="#">
                        <img src="/image/nuoc-hoa-mfk.png" alt="MFk" className="app-brand__logo"/>
                    </Link>
                    <Link to="#">
                        <img src="/image/logo-roja-parfum-1.png" alt="Roja" className="app-brand__logo"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LogoBrand;
