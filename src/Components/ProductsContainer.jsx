import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { openModal } from "../StateManagement/State";
import { useRecoilState } from "recoil";
import Loader from "./Loader";

const ProductsContainer = ({data}) => {
    const [width,setWidth]=useState("");
    const [modalType,setModalType]=useRecoilState(openModal);
    useEffect(()=>{
        console.log(data);
        if(window.innerWidth<1024)setWidth("w-[48%]");
        else if(window.innerWidth>=1024 && window.innerWidth<1440)setWidth("w-[32%]");
        else if(window.innerWidth>=1440)setWidth("w-[24%]")
        console.log(data);
        
    },[data])
    if(data.length==0)return <div className="relative bottom-10 flex justify-center items-center h-[500px]"><Loader/></div>
    return (
        <div className={` flex flex-wrap gap-2 justify-between min-h-44`}>
            {data.map((product)=>(
                <ProductCard  width={width} title={product.title} rating={product.rating} price={product.price} discount={product.discount} id={product.id} img={product.images[0]} category={product.category}/>
            ))}
        </div>
     );
}
 
export default ProductsContainer;