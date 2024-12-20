import logo from "../assets/SHOP.CO.png";
import cart from "../assets/cart.svg";
import SearchBar from "./SearchBar";
import SmallScreenSearch from "./SmallScreenSearch";
import CategoryNavBar from "./CategoryNavbar";
import CategoryNavBarSmallScreen from "./CategoryNavbarSmallScreen";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoggedUserMenu from "./LoggedUserMenu";
import GuestUserMenu from "./GuestUserMenu";
import { useRecoilState } from "recoil";
import { currUser, loading } from "../StateManagement/State";
import LoadingUserMenu from "./LoadingUserMenu";
const NavBar = () => {
    let navigate=useNavigate();
    const [user,setUser]=useRecoilState(currUser)
    const [load,setLoad]=useRecoilState(loading);
    return ( 
        <div className="flex justify-between gap-5  px-5 xl:px-20 items-center font-satoshi h-24">
            <div className="flex gap-5 items-center">
                <CategoryNavBarSmallScreen/>
                <img  onClick={()=>navigate('/')} src={logo} alt="" className="cursor-pointer w-[160px] h-[22px] mr-5"/>
            </div>
            <CategoryNavBar/>
            <SearchBar/>
            <div className="flex gap-5">
                <SmallScreenSearch/>
                <img className="cursor-pointer" onClick={()=>navigate('/cart')} src={cart} alt="" />
                {!load&&(user?<LoggedUserMenu/>:<GuestUserMenu/>)}
                {load&&<LoadingUserMenu/>}
            </div>
        </div>
     );
}
 
export default NavBar;