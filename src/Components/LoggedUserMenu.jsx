import { useNavigate } from "react-router-dom";
import user from "../assets/user.svg";
const LoggedUserMenu = () => {
    const navigate=useNavigate();
    return ( 
        <div className="group relative ">
            <img src={user} alt="" />
            <div className="z-10 shadow-lg flex flex-col justify-around absolute h-0 rounded-lg group-hover:h-44 group-hover:p-4 right-0 overflow-hidden transition-all ease-in-out duration-300 bg-white ">
                <p className="hover:bg-[#f0f0f0] w-full p-2 cursor-pointer rounded-xl">Account</p>
                <p onClick={()=>navigate('/orders')} className="hover:bg-[#f0f0f0] w-full p-2 cursor-pointer rounded-xl">Orders</p>
                <p onClick={()=>{
                    localStorage.removeItem('user');
                    window.location.reload();
                    navigate('/');
                }} className="hover:bg-[#f0f0f0] w-full p-2 cursor-pointer rounded-xl">Logout</p>
            </div>
        </div>
     );
}
 
export default LoggedUserMenu;