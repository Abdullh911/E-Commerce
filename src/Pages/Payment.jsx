import { useRecoilState } from "recoil";
import PaymentForm from "../Components/PaymentForm";
import { useNavigate } from "react-router-dom";
import { currUser } from "../StateManagement/State";
import { useEffect } from "react";
import { fetchUserByEmail } from "../Utils/dataFtech";

const Payment = () => {
    const [user,setUser]=useRecoilState(currUser);
    const navigate=useNavigate();
      useEffect(()=>{
        async function renewUser(){
          let userEmail=localStorage.getItem('user');
          if(userEmail){
            let x=await fetchUserByEmail(userEmail);
            console.log(x);
            setUser(x)
          }
          else{
            navigate('/')
        }
        }
        renewUser();
      },[]);
    if(!user)return <div></div>
    return ( 
        <div className="flex px-8 md:px-12 lg:px-20">
            <div className="md:w-[50%]">
                <h1 className="leading-tight text-[32px] md:text-[52px] w-[92%] font-integralcf mb-5">CHECKOUT</h1>
                <PaymentForm/>
            </div>
        </div>
     );
}
 
export default Payment;