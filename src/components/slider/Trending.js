import React, { useEffect, useRef, useState } from 'react'
import './Slider.css'

import { Swiper, SwiperSlide } from 'swiper/react';



// import required modules
// import { Pagination } from 'swiper/modules';
import ProductCard from '../slideProduct/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Autoplay} from 'swiper/modules';

const Trending = () => {
    

    const [productData, setProductData] = useState([])
    const handleData = async () => {
        try {
            const response = await axios.get("https://api.camrosteel.com/api/v1/all-product");
            console.log(response.data.data);
            const productss = response.data.data
            const filterProduct = productss.filter((item)=>item.property==="Trending"
             ) 
            setProductData(filterProduct)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleData()
    }, [])
    return (
        <>
            <div className='max-w-[1300px] mx-auto'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    pagination={{
                        clickable: false,
                    }}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                      }}
                    navigation={false}
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
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >

                    {productData && productData.map((item, index) => (

                        <SwiperSlide key={index}>
                            <Link to={`/Products/${item.productName}/${item._id}`} className='main-product'>
                                <div className="product">
                                    <div className="img">

                                        <img loading="lazy" decoding="async" src={item.images[0].img} onError={(e) => { e.target.src = "https://i.ibb.co/pPwsHpx/no-image-icon-23494.png" }} className="front-img" alt="" />
                                        <img loading="lazy" decoding="async" src={item.images[1].img} onError={(e) => { e.target.src = "https://i.ibb.co/pPwsHpx/no-image-icon-23494.png" }} className="back-img" alt="" />
                                        <span className={`property ${item.property === "Top Selling" ? 'topSelling' : ''} ${item.property === "Trending" ? 'topSelling' : ''} ${item.property === "bestseller" ? 'bestseller' : ''} ${item.property === "Hot Product" ? 'hotProduct' : ''} ${item.property === "" ? 'p-0' : ''}`}>{item.property}</span>
                                    </div>
                                    <div className="product-name">{item.productName}</div>
                                    <div className="sizes" key={index}>
                                        {item.sizes.map((size, index) => (
                                            <small>{size.size}</small>

                                        ))}
                                    </div>
                                    <p className='mt-[7px] w-full truncate whitespace-nowrap text-black text-start text-sm'>{item.Desc || "Best for Indian, Chinese dishes | Daily use"}</p>

                                    <div className="mrp">
                                        {item.sizes.length > 0 && (
                                            <div className="mrp">
                                                <div className="original-price">₹{item.sizes[0].originalPrice}</div>
                                                <div className="cut-price">₹{item.sizes[0].discoPrice}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid-btn">
                                        <a href="javascript:void(0)" className="addToCart">Add to Cart <i className="fa-solid fa-cart-shopping"></i></a>
                                        {/* <a href="" className="Wishlist"><i className="fa-regular fa-heart"></i></a> */}
                                    </div>
                                </div>
                            </Link>

                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </>
    )
}

export default Trending