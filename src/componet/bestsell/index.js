import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css'
import { IoCartOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { addProductToCart, getCartProducts } from "../../function/localstorage";
import { IoCart } from "react-icons/io5";
import { message } from "antd";
import { Api__url } from "../../api/config";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateAmount } from "../../redux/action";
import { total } from "../../function/common";
const BestSell = () => {

    const [apiData, setApiData] = useState([])
    const [productsInCart, setProcutdsInCart] = useState(getCartProducts() ?? [])
    const dispatch = useDispatch()

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(Api__url);
                setApiData(response.data.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }, [])



    const totalAmount = total(apiData)
    dispatch(updateAmount(totalAmount))
    const navigate = useNavigate()

    function addToCart(data) {
        let getCart = getCartProducts()
        if (getCart.find(v => v === data.id)) {
            const filterdata = getCart.filter(v => Number(v) !== Number(data.id))
            addProductToCart(filterdata);
            setProcutdsInCart(filterdata);

            message.error("Product removed from Cart")

        } else {
            getCart.push(data.id)
            addProductToCart(getCart)
            setProcutdsInCart(getCart)

            message.success("Product Added to Cart")
        }
    }


    return (
        <div>
            <div className="Bestsell">
                <h2>Best Sellers</h2>
                <Link>View all products</Link>
            </div>
            <div className="mapContinar row">

                {
                    apiData.map((v, i) => {
                        const isAdded = productsInCart?.includes(v.id)
                        const fullStars = Math.floor(v.rating.rate);
                        const halfStar = (v.rating.rate % 1) > 0.5 ? true : false;

                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 card-continar">
                                <div className="img-continar" onClick={() => navigate(`product/${v.id}`)}>
                                    <img className="imagebest" src={v.image} alt="product" />
                                </div>
                                <div className="titleCard">
                                    <div className="star">
                                        <h5>Rs. {v.price}</h5>
                                        <h6>{v.title}</h6>
                                        {[...Array(5)].map((_, index) => {
                                            if (index < fullStars) {
                                                return <FaStar key={index} size={25} className="starTrue" />;
                                            } else if (index === fullStars && halfStar) {
                                                return <FaStarHalfAlt key={index} size={25} className="starHalf" />; // You can define a class for half-star
                                            } else {
                                                return <CiStar key={index} size={25} className="starFalse" />;
                                            }
                                        })}
                                        ({v.rating.count})
                                    </div>
                                    <div onClick={() => addToCart(v)} className="cart">
                                        {isAdded ? <IoCart size={30} /> : <IoCartOutline size={30} />}
                                    </div>
                                </div>


                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default BestSell