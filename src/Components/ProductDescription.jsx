import { useEffect, useState } from "react";
import { useStar } from "../Hooks/useStar";
import tic from '../assets/tic.svg';
import { useSelect } from "../Hooks/useSelect";
import {updateUser} from '../Utils/dataFtech';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState } from "recoil";
import { currUser } from "../StateManagement/State";

const ProductDescription = ({product}) => {
    const stars=useStar(product.rating);
    const [user,setUser]=useRecoilState(currUser);
    const [pieces,setPieces]=useState(1);
    const {colors,sizes,getmax,selectedColor,selectedSize,setSelectedColor,setSelectedSize}=useSelect(product)
    function increment(){
        if(pieces<getmax(selectedColor,selectedSize))setPieces(prev=>prev+1)
    }
    function decrement(){
        if(pieces>1)setPieces(prev=>prev-1)
    }
    async function addToCart() {
        const loadingToast = toast.loading("Adding item to cart...", {
            position: "top-right",
            style: { background: "black", color: "white" },
        });
        if(user==null){
            toast.update(loadingToast, {
                render: "Please Login or Sign Up",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
            return;
        }
        
        
        try {
            console.log(user);
            let orderObject = {
                productId: product.id,
                productImg: product.images[0],
                price: (product.price * (1 - product.discount / 100)).toFixed(),
                size: selectedSize,
                color: selectedColor,
                quantity: pieces,
                title: product.title,
                availablePieces: product.availablePieces,
                category: product.category
            };
            const updatedUser = {
                ...user,
                cart: [...user.cart, orderObject],
            };
            let newUser = await updateUser(user.email, updatedUser);
            console.log(newUser);
            
            if (newUser) {
                setUser(newUser);
                toast.update(loadingToast, {
                    render: "Item added to cart!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                });
            }
        } catch (error) {
            const errorMessage = error.message || "An unexpected error occurred";

            toast.update(loadingToast, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    }    
    return ( 
        <div className="xl:w-[49%] flex flex-col gap-4 justify-between">
            <h1 className="leading-tight text-[37px] md:text-[44px] w-[92%] font-integralcf">{product.title}</h1>
            <div className="flex gap-1 items-center">
                {stars.map((star)=>(
                    <img className="w-7 h-7" src={star} alt="" />
                ))}
                <p className="ml-2 font-satoshi text-base">{product.rating}/5</p>
            </div>
            <div className="font-satoshi font-bold flex gap-3">
                <p className="text-3xl">${product.discount==0?`${product.price}`:`${(product.price*(1-product.discount/100)).toFixed()}`} {product.discount!=0&&<span className="line-through text-gray-500">{product.price}</span>}</p>
                <p className="p-1 text-lg bg-[#FF33331A] items-center rounded-full  w-20 flex justify-center text-[#FF3333]">{product.discount}%</p>
            </div>
            <p className="font-satoshi text-[#36363699] pb-3 border-b-2">{product.description}</p>
            <div className="pb-5 border-b-2">
                <p className="font-satoshi text-[#36363699] ">Select Colors</p>
                <div className="flex gap-3">
                    {colors.map((color,index)=>(
                        <div onClick={()=>{
                            let x=getmax(color,selectedSize);
                            if(x==0){
                                return;
                            }
                            setPieces(1);
                            setSelectedColor(color);
                        }} className={`${getmax(color,selectedSize)==0?'border-2 border-red-500':''} flex justify-center items-center cursor-pointer w-10 h-10 rounded-full `} style={{backgroundColor:color}}>
                            {color==selectedColor&&<img src={tic} alt="" />}
                        </div>
                    ))}
                </div>
            </div>
            <div className="pb-5 border-b-2">
                <p className="font-satoshi text-[#36363699] ">Choose Size</p>
                <div className="flex gap-3">
                    {sizes.map((size,index)=>(
                        <p onClick={()=>{
                            if(getmax(selectedColor,size)==0){
                                return;
                            }
                            setPieces(1);
                            setSelectedSize(size);
                        }} className={`${getmax(selectedColor,size)==0?'border-2 border-red-500':''} ${selectedSize==size?'bg-black text-white':'bg-[#f0f0f0] text-black'} text-sm cursor-pointer p-2 px-3 rounded-full`}>{size}</p>
                    ))}
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex bg-[#F0F0F0] p-1 px-2 w-[25%] md:w-[19%] rounded-full justify-between items-center">
                    <button onClick={decrement} className="text-3xl">−</button>
                    <p>{pieces}</p>
                    <button onClick={increment} className="text-3xl">+</button>
                </div>
                <button onClick={addToCart} className="w-[75%] md:w-[79%] rounded-full p-4 text-white bg-black">Add to Cart</button>
            </div>
        </div>
     );
}

export default ProductDescription;