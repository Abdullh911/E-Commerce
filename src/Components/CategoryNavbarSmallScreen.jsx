import drop from "../assets/dropShop.svg";
import burgerIco from "../assets/burgerIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CategoryNavBarSmallScreen = () => {
    const [openShop,setOpenShop]=useState(false);
    const navigate=useNavigate();
    function nav(cat){
        navigate(`/collection/${"Home-"+cat}/${cat}/${1}`)
    }
    return ( 
        <div className="group relative z-20">
            <img className="block md:hidden" src={burgerIco} alt="" />
            <div  className="z-10 flex flex-col gap-10 group-hover:p-10 group-hover:w-[70%] overflow-hidden w-0 bottom-0 fixed shadow-xl bg-white top-0 left-0 transition-all duration-200 ease-in-out h-full">
                <div className="">
                    <p onClick={()=>setOpenShop(!openShop)} className="flex items-center gap-1">Shop <img className="w-20 h-4 " src={drop} alt="" /></p>
                    <div className={`flex flex-col justify-between mt-5 h-0 ${openShop?'h-32 px-6':'h-0'}   overflow-hidden bg-white rounded-lg transition-all ease-in-out duration-300`}>
                        <p  onClick={()=>nav("Men")}>Men</p>
                        <p onClick={()=>nav("women")}>Women</p>
                        <p onClick={()=>nav("boys")}>Boys</p>
                        <p onClick={()=>nav("girls")}>Girls</p>
                    </div>
                </div>
                <p>On Sale</p>
                <p onClick={()=>nav("new-arrivals")}>New Arrivals</p>
                <p>Brands</p>
            </div>
        </div>
     );
}
 
export default CategoryNavBarSmallScreen;