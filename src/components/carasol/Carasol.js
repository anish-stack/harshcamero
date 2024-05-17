import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

// import required modules
import { Pagination ,Navigation } from 'swiper/modules';
import axios from 'axios';

const Carasol = () => {
    const [caraImg,setImage]  = useState([])

    const handleCaraImg= async()=>{
        try {
            const response = await axios.get("https://api.camrosteel.com/api/v1/All-Active-Banner");
            console.log(response.data.data)
            setImage(response.data.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        handleCaraImg()
    },[])
  return (
    <>
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {
                caraImg && caraImg.map((item,index)=>(
                    <SwiperSlide key={index}><img src={item.image} alt="carasoul-image" /></SwiperSlide>

                ))
                
            }
                <div className="swiper-button-prev"><i class="fa-solid fa-arrow-left"></i></div>
                <div className="swiper-button-next"><i class="fa-solid fa-arrow-right"></i></div>
            
        </Swiper>
    </>
  )
}

export default Carasol