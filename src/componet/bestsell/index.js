import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css'
import Bestsell from "./data";
import { IoCartOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { addProductToCart, getCartProducts } from "../../function/localstorage";
import { IoCart } from "react-icons/io5";


import { message } from "antd";


const BestSell = () => {

    const navigate = useNavigate()
    const [productsInCart, setProcutdsInCart] = useState(getCartProducts() ?? [])

    function addToCart(data) {
        let getCart = getCartProducts()
        if (getCart.find(v => v === data.id)) {
            const filterdata = getCart.filter(v => Number(v) !== Number(data.id))
            addProductToCart(filterdata);
            setProcutdsInCart(filterdata)
            message.success("Product removed from Cart")

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
                    Bestsell.map((v, i) => {
                        const isAdded = productsInCart?.includes(v.id)
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div className="card-continar">
                                    <div className="img-continar" onClick={() => navigate(`product/${v.id}`)}>
                                        <img className="imagebest" src={v.image} />
                                    </div>
                                    <div className="titleCard">
                                        <div>
                                            <h5>Rs. {v.price}</h5>
                                            <h6>{v.title}</h6>
                                            <CiStar size={25} />
                                            <CiStar size={25} />
                                            <CiStar size={25} />
                                            <CiStar size={25} />
                                            <CiStar size={25} />
                                            ({v.rating.count})
                                        </div>
                                        <div onClick={() => addToCart(v)} className="cart">
                                            {isAdded?<IoCart size={25} />:<IoCartOutline size={25} />}
                                        </div>
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