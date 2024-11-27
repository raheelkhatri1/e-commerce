
import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
// import { Navigation } from 'swiper/modules';

import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa6";

function Top() {
    return (

        <div className='top'>
            <div className='gmail'>
                <SiGmail size={30} />
                <FaFacebookF className='facebook' size={22} />
            </div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>Save 20% use code: BULKSAVE</SwiperSlide>
                <SwiperSlide>FREE SHIPPING on orders above RS: 200</SwiperSlide>
            </Swiper>
            <div>
                <select className='drop-down' name="language">
                    <option value="english">English</option>
                    <option value="urdu">Urdu</option>
                    <option value="sindhi">Sindhi</option>
                </select>
            </div>
        </div>
    );
}

export default Top
