import { useEffect, useState } from "react";
import go from '../assets/go.svg'
import { useRecoilState } from "recoil";
import { currUser } from "../StateManagement/State";
import { useNavigate } from "react-router-dom";
import { useSelect } from "../Hooks/useSelect";
import { fetchProductByIdAndCategory, updateUser } from "../Utils/dataFtech";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RecieptSide = () => {
    const [user, setUser] = useRecoilState(currUser);
    const [total, setTotal] = useState(0);
    const navigate=useNavigate();
    async function goToCheckout() {
        console.log(user);
        
        let tempUser = { ...user, cart: [...user.cart] };
        let changed = false;
    
        for (let i = 0; i < tempUser.cart.length; i++) {
            let objectNewQnt = await fetchProductByIdAndCategory(
                tempUser.cart[i].category,
                tempUser.cart[i].productId
            );
            let max = getmaxLast(tempUser.cart[i].color, tempUser.cart[i].size, objectNewQnt);
            if (tempUser.cart[i].quantity > max) {
                changed = true;
                tempUser.cart[i] = { ...tempUser.cart[i], quantity: max };
            }
        }
        if (changed) {
            console.log(tempUser);
            setUser(tempUser);
            await updateUser(tempUser.email, tempUser);
            toast.warning("Adjusted quantity to available stock.");
        } else {
            setUser(tempUser);
            console.log(tempUser);
            await updateUser(tempUser.email, tempUser);
            navigate('/payment');
        }
    }
    
    function getmaxLast(color,size,product){
        for(let i=0;i<product.availablePieces.length;i++){
            if(product.availablePieces[i].color==color && product.availablePieces[i].size==size){
                return product.availablePieces[i].numOfPieces;
            }
        }
    }
    useEffect(() => {
        function reCalculateTotal(updatedUser){
            let x=0;
            for(let i=0;i<updatedUser.cart.length;i++){
                let temp=updatedUser.cart[i].price;
                x+=temp*updatedUser.cart[i].quantity;
            }
            return x;
        }
        console.log(user);
        
        setTotal(reCalculateTotal(user));
    }, [user]);

    return (
        <div className="w-full lg:w-[37%] font-satoshi flex flex-col gap-3 border-2 rounded-xl p-4 h-fit">
            <h1 className="font-satoshi text-xl">Order Summary</h1>
            <p className="text-gray-600 flex justify-between">
                Subtotal <span className="font-bold text-black">${total}</span>
            </p>
            <p className="flex justify-between text-gray-600 pb-3 border-b-2">
                Delivery Fee <span className="font-bold text-black">$15</span>
            </p>
            <p className="text-gray-600 flex justify-between">
                Total <span className="font-bold text-black">${(Number(total )+ 15).toFixed()}</span>
            </p>
            <div className="flex justify-between">
                <input
                    className="w-[70%] rounded-full border-2 p-2"
                    placeholder="Add Promo code"
                    type="text"
                    name=""
                    id=""
                />
                <button className="w-[29%] text-white bg-black p-2 px-4 rounded-full">Apply</button>
            </div>
            <button onClick={goToCheckout} className="w-full flex justify-center items-center gap-2 text-white bg-black p-4 rounded-full">Go to Checkout <img src={go} alt="" /></button>
        </div>
    );
};

export default RecieptSide;
