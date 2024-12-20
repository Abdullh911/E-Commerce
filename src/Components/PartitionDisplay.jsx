import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useGet from '../Hooks/useGet';
import {formatCategoryName2, replaceSpacesWithDash, toCamelCase, toKebabCaseCombined } from '../Utils/functions';
import ProductCard from './ProductCard';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const PartitionDisplay = ({ title,main }) => {
    const navigate=useNavigate();
    const filter = useMemo(() => ({}), []);
    const { data, error, loading } = useGet("en",1, 5, toCamelCase(title),filter);
    useEffect(()=>{
        console.log(title);
        
    },[])
    return (
        <div className='pb-20 flex flex-col items-center'>
            <h1 className="text-[30px] md:text-[56px]  font-integralcf py-8">{main==undefined?title:main}</h1>
            <div className="px-16 w-full">
                <Swiper
                    spaceBetween={50}
                    breakpoints={{
                        320: { slidesPerView: 1.3 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                    slidesPerView={5}
                >
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={index}>
                                <div className="h-80 bg-gray-300 animate-pulse rounded-md"></div>
                            </SwiperSlide>
                          ))
                        : data.map((product, index) => (
                            <SwiperSlide key={index} className='w-full'>
                                <ProductCard
                                    price={product.price}
                                    rating={product.rating}
                                    title={product.title}
                                    discount={product.discount}
                                    id={product.id}
                                    img={product.images[0]}
                                    category={product.category}
                                />
                            </SwiperSlide>
                          ))}
                </Swiper>
            </div>
            <button onClick={() => navigate(`/collection/${"Home-"+replaceSpacesWithDash(title)}/${toKebabCaseCombined(title)}/${1}`)} className='mt-5 p-3 rounded-full border-[#0000001A] px-20 border-2'>View All</button>
        </div>
    );
};

export default React.memo(PartitionDisplay);
