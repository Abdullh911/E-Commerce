import { useEffect, useState } from "react";
import rightDrop from '../assets/rightDrop.svg'
import one from '../assets/one-circle.svg';
import drop from "../assets/dropShop.svg";
import { createFilter } from "../Utils/functions";
import { useFilter } from "../Hooks/useFilter";
const TypeSelect = () => {
    const {updateAttribute,tFilter}=useFilter();
    const [selected,setSelected]=useState(tFilter.productType||[]);
    function selectType(type) {
        let temp;
        if(selected.includes(type)){
            temp=selected.filter((c) => c != type)
            setSelected(temp);
        }
        else{
            temp=[...selected,type]
            setSelected(temp);
        }
        updateAttribute("productType",temp); 
    }
    useEffect(()=>{
        console.log(createFilter(tFilter));
    },[tFilter])
    
    const types=["Tshirts","Shorts","Shirts", "Hoodie","Jeans"];
    return ( 
        <div className={`w-full py-4 border-b-2`}>
            <div className="flex flex-col gap-2">
                {types.map((type)=>(
                    <div onClick={()=>selectType(type)} className="flex justify-between items-center cursor-pointer">
                        <p className="text-[#00000099]">{type}</p>
                        <img src={selected.includes(type)?one:rightDrop} alt="" />
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default TypeSelect;