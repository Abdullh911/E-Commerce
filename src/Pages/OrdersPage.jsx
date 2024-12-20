import { useRecoilState } from "recoil";
import { currUser } from "../StateManagement/State";
import OrderCard from "../Components/OrderCard";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import { fetchUserByEmail } from "../Utils/dataFtech";

const OrdersPage = () => {
    const [user,setUser]=useRecoilState(currUser);
    const [load,setLoad]=useState(true);
    let navigate=useNavigate();
    useEffect(()=>{
        async function renewUser(){
          let userEmail=localStorage.getItem('user');
          if(userEmail){
            let x=await fetchUserByEmail(userEmail);
            setUser(x);
            setLoad(false)
          }
          else{
            navigate('/');
          }
        }
        renewUser();
        
    },[]);
    if(load)return <div className="h-[700px]"><Loader/></div>
    return ( 
        <div className="px-16 lg:px-28 flex flex-col gap-3">
            <h1 className="leading-tight text-[32px] md:text-[52px] w-[92%] font-integralcf mb-5">YOUR ORDERS</h1>
            {user.orders.map((order)=>(
                <OrderCard orderObj={order}/>
            ))}
        </div>
     );
}
 
export default OrdersPage;