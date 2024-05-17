import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
const OurProducts = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const { name } = useParams()
    const [productData, setProductData] = useState([])
    const handleData = async () => {
        try {
            const response = await axios.get(`https://api.camrosteel.com/api/v1/all-product`);
            console.log(response.data.data);
            setProductData(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleData()
    }, [])

    return (
        <>

            <section className="container mt-5">

                <div className="row">
                    <div className="col-md-12">
                        <div className="product-lists main-product shop-page grid-5">
                            {productData && productData.slice(0, 10).map((item, index) => (
                                <Link to={`/Products/${item.productName}/${item._id}`} className="product" key={index}>
                                    <div className="img">

                                        <img loading="lazy" decoding="async" src={item.images[0].img} onError={(e) => { e.target.src = "https://i.ibb.co/pPwsHpx/no-image-icon-23494.png" }} className="front-img" alt="" />
                                        <img loading="lazy" decoding="async" src={item.images[1].img} onError={(e) => { e.target.src = "https://i.ibb.co/pPwsHpx/no-image-icon-23494.png" }} className="back-img" alt="" />
                                        <span className="property bestseller">{item.property}</span>
                                    </div>
                                    <div className="product-name">{item.productName}</div>
                                    <div className="sizes" key={index}>
                                        {item.sizes.map((size, index) => (
                                            <small key={index}>{size.size}</small>

                                        ))}
                                    </div>
                                    <p className='mt-[7px] w-full truncate whitespace-nowrap text-black text-start text-sm'>{item.Desc || "Best for Indian, Chinese dishes | Daily use"}</p>

                                    <div className="sizes">
                                        {item.sizes.length > 0 && (
                                            <div className="mrp">
                                                <div className="original-price">₹{item.sizes[0].originalPrice}</div>
                                                <div className="cut-price">₹{item.sizes[0].discoPrice}</div>
                                            </div>
                                        )}
                                    </div>

                                  
                                    <div className="grid-btn">
                                        <a href="javascript:void(0)" className="addToCart">Add to Cart <i className="fa-solid fa-cart-shopping"></i></a>
                                        {/* <Link to='' className="Wishlist"><i className="fa-regular fa-heart"></i></Link> */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid-btn btnsc">
                    <a href="/Shop" className="buttonview">View More</a>
                    {/* <Link to='' className="Wishlist"><i className="fa-regular fa-heart"></i></Link> */}
                </div>
            </section>
        </>
    )
}

export default OurProducts