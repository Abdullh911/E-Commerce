import { useEffect, useState } from "react";
import bigStar from '../assets/Star 1.svg';
import smallStar from '../assets/Star 5.svg';
import { useStar } from "../Hooks/useStar";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ title, id, rating, price, discount, img,width,category }) => {
    const stars=useStar(rating);
    const navigate =useNavigate();
    return (
        <div onClick={()=>navigate(`/product/${category}/${id}`)} className={`${width?width:'w-full'} h-fit max-h-full`}>
            <div className="bg-[#F0EEED] w-full h-56 relative flex justify-center rounded-[20px] overflow-hidden">
                <img src={img} alt={title} loading="lazy" className=" object-cover mix-blend-darken transition-all ease-in-out duration-300 hover:scale-125 " />
            </div>
            <div>
                <h3 className="whitespace-nowrap overflow-hidden text-ellipsis font-satoshi font-bold pt-2">{title}</h3>
                <div className="flex">
                    {stars.map((star)=>(
                        <img src={star} alt="" />
                    ))}
                    <p className="ml-2 font-satoshi text-sm">{rating}/5</p>
                </div>
                <div className="font-satoshi font-bold flex gap-3">
                    <p>${discount==0?`${price}`:`${(price*(1-discount/100)).toFixed()}`} {discount!=0&&<span className="line-through text-gray-500">{price}</span>}</p>
                    <p className="p-1 bg-[#FF33331A] rounded-full text-xs w-12 flex justify-center text-[#FF3333]">{discount}%</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
