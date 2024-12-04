import React, { useEffect, useState } from "react";
import Top from "../../componet/top";
import Navbar from "../../componet/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Bestsell from "../../componet/bestsell/data";
import './style.css'
import { CiStar } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { Api__url } from "../../api/config";
import axios from "axios";
import Footer from "../../componet/footer";
import { addProductToCart, getCartProducts } from "../../function/localstorage";
import { message } from "antd";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const ProductDetail = () => {

    const [apiData, setApiData] = useState([])
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1); // 1 se quantity badhaye
    };

    // Quantity ko 1 se decrement karna (lekin minimum 1 hone chahiye)
    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Agar 1 se kam ho toh minimum 1 ho
    };

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(Api__url);
                setApiData(response.data)
            } catch (error) {
                console.error(error, "api q");
            }
        }
        getUser()
    }, [])

    const parms = useParams()
    const apiDataParm = apiData.find(
        (v) => Number(v.id) === Number(parms.id)
    )

    const navigat = useNavigate()
    const [productsInCart, setProcutdsInCart] = useState(getCartProducts() ?? [])

    function addCart(data) {
        let getCart = getCartProducts()
        if (getCart.find(v => v === data.id)) {
            const filterData = getCart.filter(v => Number(v) !== Number(data.id))
            addProductToCart(filterData)
            setProcutdsInCart(filterData)
            message.error("Product removed from Cart")
        } else {
            getCart.push(data.id)
            addProductToCart(getCart)
            setProcutdsInCart(getCart)
            message.success("Product Added to Cart")
        }
    }

    function shareFacebook() {
        const url = window.location.href; // current page URL
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(fbShareUrl, "_blank", "width=600,height=400");
    }

    function BactToHome() {
        navigat("/")
    }
    const isAdded = productsInCart?.includes(apiDataParm?.id)
    const fullStars = Math.floor(apiDataParm?.rating.rate);
    const halfStar = (apiDataParm?.rating.rate % 1) > 0.5 ? true : false;
    return (
        <div>

            <Top />
            <Navbar />
            <button className="btnHome" onClick={BactToHome}>Home</button> / {apiDataParm?.category} / {apiDataParm?.title}
            <div className="detail-page">

                <div className="img-box col-12 col-sm-6">
                    <img src={apiDataParm?.image} />
                </div>
                <div className=" data col-12 col-sm-6">
                    <h3>Rs.{apiDataParm?.price}</h3>
                    <h2>{apiDataParm?.title}</h2>
                    {[...Array(5)].map((v, i) => {
                        if (i < fullStars) {
                            return <FaStar key={i} size={25} className="trueStar" />
                        } else if (i === fullStars && halfStar) {
                            return <FaStarHalfAlt key={i} size={25} className="starHalf" />;

                        } else {
                            return <CiStar key={i} size={29} className="starFalse" />
                        }
                    })

                    }
                    <h5>{apiDataParm?.description}</h5>
                    <h1>Rs.{apiDataParm?.price}</h1>
                    <hr />
                    <div className="plusMinusContnar">
                        <div className="cirleminus" onClick={decrementQuantity}>-</div>
                        <input placeholder="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, e.target.value))} className="inputCount" type="number" />
                        <div onClick={incrementQuantity} className="cirleminus">+</div>
                        {
                            isAdded ? <button type="button" class="btn btn-dark btnCart" onClick={() => addCart(apiDataParm)}>Remove to cart</button>
                                : <button type="button" class="btn btn-dark btnCart" onClick={() => addCart(apiDataParm)}>Add to cart</button>

                        }
                        <button className='btnAccount'>Buy it now</button>
                    </div>
                    <div>
                        <h4 className="mt-3">share</h4>
                        <div className="d-flex gap-3 align-items-center">
                            <button onClick={() => shareFacebook()} className="btnFBook">
                                <FaFacebookF size={25} />
                                <h6>facebook</h6>
                            </button>
                            <button className="btnFBook">
                                <IoLogoWhatsapp size={25} />
                                <h6>Whatsapp</h6>
                            </button>

                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail