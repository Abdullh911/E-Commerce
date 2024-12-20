import { useNavigate } from "react-router-dom";
import user from "../assets/user.svg";
const GuestUserMenu = () => {
    const navigate=useNavigate();
    return ( 
        <div className="group relative">
            <img src={user} alt="" />
            <div className="z-10 flex shadow-lg flex-col justify-around absolute h-0 rounded-lg group-hover:h-32 group-hover:p-4 right-0 overflow-hidden transition-all ease-in-out duration-300 bg-white ">
                <p onClick={()=>navigate('/login')} className="hover:bg-[#f0f0f0] whitespace-nowrap w-full p-2 cursor-pointer rounded-xl">Log in</p>
                <p onClick={()=>navigate('/signup')} className="hover:bg-[#f0f0f0] whitespace-nowrap w-full p-2 cursor-pointer rounded-xl">Sign up</p>
            </div>
        </div>
     );
}
 
export default GuestUserMenu;