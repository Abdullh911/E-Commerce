import { useNavigate } from "react-router-dom";
import drop from "../assets/dropShop.svg";
const CategoryNavBar = () => {
    const navigate=useNavigate();
    function nav(cat){
        navigate(`/collection/${"Home-"+cat}/${cat}/${1}`)
    }
    return ( 
        <div className="hidden md:flex gap-4  whitespace-nowrap text-sm font-satoshi">
            <div className="cursor-pointer group relative flex flex-col items-center">
                <p className="flex items-center gap-1 ">Shop <img className="w-4 h-4" src={drop} alt="" /></p>
                <div className="z-10 shadow-lg flex flex-col justify-between h-0 mt-5 absolute group-hover:h-32 group-hover:p-4 group-hover:px-6  overflow-hidden bg-white rounded-lg transition-all ease-in-out duration-300">
                    <p className="cursor-pointer" onClick={()=>nav("Men")}>Men</p>
                    <p className="cursor-pointer" onClick={()=>nav("women")}>Women</p>
                    <p className="cursor-pointer" onClick={()=>nav("boys")}>Boys</p>
                    <p className="cursor-pointer" onClick={()=>nav("girls")}>Girls</p>
                </div>
            </div>
            <p className="cursor-pointer">On Sale</p>
            <p className="cursor-pointer" onClick={()=>nav("new-arrivals")}>New Arrivals</p>
            <p className="cursor-pointer">Brands</p>
        </div>
     );
}
 
export default CategoryNavBar;