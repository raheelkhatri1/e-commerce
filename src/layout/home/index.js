import React from "react";
import Top from '../../componet/top/index'
import Navbar from "../../componet/navbar/index";
import Slider from "../../componet/slider";
import BestSell from "../../componet/bestsell";
import PersistentDrawerRight from "../../componet/driver";
import Footer from "../../componet/footer";

const Home = () => {
    return(
        <div>
            <Top />
            <Navbar />
            <Slider />
            <BestSell />
            <Footer />
        </div>
        
        
    )
}

export default Home