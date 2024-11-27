import React from "react";
import Top from "../../componet/top";
import Navbar from "../../componet/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Bestsell from "../../componet/bestsell/data";
import './style.css'
import { CiStar } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const ProductDetail = () => {
    const parms = useParams()
    const filterData = Bestsell.find(
        (v) => Number(v.id) === Number(parms.id)
    )

    const navigat = useNavigate()

    function BactToHome() {
        navigat("/")
    }
    console.log(filterData)

    return (
        <div>
            <Top />
            <Navbar />
            <button className="btnHome" onClick={BactToHome}>Home</button> / {filterData.category} / {filterData.title}
            <div className="detail-page">

                <div className="img-box col-12 col-sm-6">
                    <img src={filterData.image} />
                </div>
                <div className=" data col-12 col-sm-6">
                    <h3>Rs.{filterData.price}</h3>
                    <h2>{filterData.title}</h2>
                    <CiStar size={25} />
                    <CiStar size={25} />
                    <CiStar size={25} />
                    <CiStar size={25} />
                    <CiStar size={25} />
                    <h5>{filterData.description}</h5>
                    <h1>Rs.{filterData.price}</h1>
                    <hr />
                    <div className="plusMinusContnar">
                        <div className="cirleminus">-</div>
                        <input className="inputCount" type="number" />
                        <div className="cirleminus">+</div>
                        <button type="button" class="btn btn-dark btnCart">Add to cart</button>
                        <button className='btnAccount'>Buy it now</button>
                    </div>
                    <div>
                        <h4 className="mt-3">share</h4>
                        <div className="d-flex gap-3 align-items-center">
                            <button className="btnFBook">
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
        </div>
    )
}

export default ProductDetail