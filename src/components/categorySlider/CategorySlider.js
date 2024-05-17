import React, { useEffect, useRef, useState } from 'react'
import './CategorySlider.css'

import { Swiper, SwiperSlide } from 'swiper/react';


import { Autoplay, Navigation, Pagination} from 'swiper/modules';
// import required modules
// import { Pagination } from 'swiper/modules';
import ProductCard from '../slideProduct/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategorySlider = () => {

    const [categ,setCateg] = useState([])
    const handleCategories= async()=>{
        try {

            const response = await axios.get("https://api.camrosteel.com/api/v1/getAllCategorey")
            console.log(response.data);
            setCateg(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        handleCategories()
    },[])

  return (
    <>
        <div className='container md:w-[80%] mt-5 max-w-[1300px] mx-auto'>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                
                pagination={{
                    clickable: false,
                }}
                autoplay={true}
                // navigation={true}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                breakpoints={{
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                }}
                // modules={[Pagination]}
                // modules={[Autoplay]}
                modules={[Pagination, Navigation]}

                className="mySwiper"
            >

                
                {categ.map((item,index)=>(
                    <SwiperSlide key={index}>
                        <Link to={`/ProductBy-Category/${item.category}`} className='categories-slider'>
                            <div className="item">
                                <div className="single">
                                    <img loading="lazy" decoding="async" src={item.image} alt="" />
                                    <p>{item.category}</p>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
                {/* Custom navigation arrows */}
                <div className="swiper-button-prev"><i class="fa-solid fa-arrow-left"></i></div>
                <div className="swiper-button-next"><i class="fa-solid fa-arrow-right"></i></div>


                
            </Swiper>
        </div>
    </>
  )
}

export default CategorySlider