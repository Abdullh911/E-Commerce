import { useNavigate } from "react-router-dom";
import Stats from "./Stats";

const StoreInfo = () => {
    let navigate=useNavigate();
    return ( 
        <div className="w-[100vw] lg:w-1/2 md:pt-[6%] md:pl-[6%] flex flex-col gap-6 items-center md:items-start p-2">
            <div className="w-full p-2">
                <h1 className="leading-tight text-[37px] md:text-[64px] w-[92%] font-integralcf">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                <p className="font-satoshi text-[#36363699] w-[75%]">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            </div>
            <button onClick={()=>navigate(`/collection/${"Home-Casual"}/casual/${1}`)} className="w-full  lg:w-[28%] p-4 bg-black rounded-full text-white">Shop Now</button>
            <div className="flex flex-wrap h-[75px] items-center justify-center lg:justify-start gap-7 w-[100%] mb-20 whitespace-nowrap">
                <Stats head={"200+"} details={"International Brands"} />
                <div class="w-[0.5px] h-[100%] bg-gray-400"></div>
                <Stats head={"2,000+"} details={"High-Quality Products"} />
                <div class="hidden md:block w-[0.5px] h-[100%] bg-gray-400"></div>
                <Stats head={"30,000+"} details={"Happy Customers"} />
            </div>
           
        </div>
     );
}
 
export default StoreInfo;