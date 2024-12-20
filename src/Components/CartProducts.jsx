import { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { useRecoilState } from "recoil";
import { currUser } from "../StateManagement/State";

const CartProducts = () => {
    const [user,setUser]=useRecoilState(currUser);
    return ( 
        <div className="w-full lg:w-[60%] flex flex-col gap-4 border-2 rounded-xl p-4">
            {user.cart.map((obj,index)=>(
                <div key={index} className={`${index==user.cart.length-1?'':'border-b-2'} flex w-full gap-3  pb-3`}>
                    <CartCard cartObj={obj} index={index}/>
                </div>
            ))}
        </div>
     );
}
 
export default CartProducts;