import Nav from "../../Component/Nav/Nav";
import Footer from "../../Component/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useRef} from "react";
import {fetchBrands} from "../../Redux/brand/brandSlice";
import {Link} from "react-router-dom";
import '../../style/scss/Brand.scss'

function BrandPage() {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands.brands);
    const status = useSelector((state) => state.brands.status);
    const [activeLetter, setActiveLetter] = useState(null);
    const brandRefs = useRef({});

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBrands());
        }
    }, [status, dispatch]);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const groupBrandsByLetter = () => {
        const grouped = {};
        const sortedBrands = [...brands].sort((a, b) => a.name.localeCompare(b.name));
        sortedBrands.forEach((brand) => {
            const firstLetter = brand.name.charAt(0).toUpperCase();
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = [];
            }
            grouped[firstLetter].push(brand);
        });

        return grouped;
    };
    const groupedBrands = groupBrandsByLetter();

    const scrollToLetter = (letter) => {
        const element = brandRefs.current[letter];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, behavior: 'smooth',
            });
            setActiveLetter(letter);
        }
    };

    const formatBrandName = (name) => {
        return name.toLowerCase().replace(/ /g, '-');
    };

    return (
        <div>
            <Nav/>
            <div className="container">
                <p className="fs-1 text-center mt-4">Thương Hiệu</p>
                <div className="sticky-top bg-white py-3">
                    <div className="d-flex justify-content-center">
                        {alphabet.map((letter) => (<span
                            key={letter}
                            className={`mx-2 cursor-pointer ${activeLetter === letter ? "active-letter" : ""}`}
                            style={{fontSize: '1.5rem', cursor: 'pointer'}}
                            onClick={() => scrollToLetter(letter)}
                        >
                                {letter}
                            </span>))}
                    </div>
                </div>
                <div className="row my-5 ms-5">
                    {alphabet.map((letter) => (<div key={letter}
                                                    className="col-12 col-md-6 col-lg-3 mb-4"
                                                    ref={(el) => (brandRefs.current[letter] = el)}>
                        <h5>{letter}</h5>
                        {groupedBrands[letter] && groupedBrands[letter].length > 0 ? (<div>
                            {groupedBrands[letter].map((brand, index) => (<p key={index} className="mb-1">
                                <Link to={`/thuong-hieu/${formatBrandName(brand.name)}`}
                                      className="text-black-50 brand__name">
                                    {brand.name}
                                </Link>
                            </p>))}
                        </div>) : (<p className="text-black-50">Không có thương hiệu nào.</p>)}
                    </div>))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default BrandPage;
