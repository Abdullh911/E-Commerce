import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProducts from "../Components/CartProducts";
import RecieptSide from "../Components/RecieptSide";
import { useRecoilState } from "recoil";
import { currUser } from "../StateManagement/State";
import { fetchProductByIdAndCategory, fetchUserByEmail } from "../Utils/dataFtech";
import Loader from "../Components/Loader";

const CartPage = () => {
    const [user,setUser]=useRecoilState(currUser);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
    async function renewUser(){
        let userEmail=localStorage.getItem('user');
        if(userEmail){
        let x=await fetchUserByEmail(userEmail);
        console.log(x);
        for(let i=0;i<x.cart.length;i++){
            let tempProd=await fetchProductByIdAndCategory(x.cart[i].category,x.cart[i].productId);
            x.cart[i].availablePieces=tempProd.availablePieces;
        }
        console.log(x);
        setUser(x)
        setLoading(false);
        }
        else{
            setLoading(false)
            navigate('/')
        }
    }
    renewUser();
    },[]);
    if(loading)return <div className="h-[1500px] md:h-[500px]"><Loader/></div>
    return ( 
        <div className="px-5 md:px-24 w-full">
            <h1 className="leading-tight text-[32px] md:text-[52px] w-[92%] font-integralcf mb-5">YOUR CART</h1>
            <div className="flex gap-5 flex-wrap">
                <CartProducts/>
                <RecieptSide/>
            </div>
        </div>
     );
}
 
export default CartPage;