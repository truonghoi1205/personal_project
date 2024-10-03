import {Link} from "react-router-dom";

function Logo() {
    return (
        <Link to={"/"}>
            <img src="/image/main-logo.png" alt="" style={{width: "80px"}}/>
        </Link>
    );
}

export default Logo;