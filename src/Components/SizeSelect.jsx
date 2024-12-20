import { useState } from "react";
import drop from "../assets/dropShop.svg";
import { useFilter } from "../Hooks/useFilter";
import { useRecoilState } from "recoil";
const SizeSelect = () => {
    const {updateAttribute,tFilter}=useFilter();
    const [show,setShow]=useState(true);
    const [selected,setSelected]=useState(tFilter.sizes||[]);
    
    function selectSize(size) {
        let temp;
        if(selected.includes(size)){
            temp=selected.filter((c) => c != size)
            setSelected(temp);
        }
        else{
            temp=[...selected,size];
            setSelected(temp);
        }
        updateAttribute("sizes",temp);
    }
    const sizes=["Small", "Medium", "Large", "X-large"]
    return ( 
        <div className={`w-full mt-5 border-b-2  ${show?'h-32 pb-4':'h-0 overflow-hidden pb-8'}  transition-all ease-in-out duration-300`}>
            <div className="mb-3 flex justify-between">
                <h1 className="font-satoshi font-bold">Sizes</h1>
                <img className="cursor-pointer" onClick={()=>setShow(!show)} src={drop} alt="" />
            </div>
            <div className="flex flex-wrap gap-3 ">
                {sizes.map((size)=>(
                    <p onClick={()=>selectSize(size)} className={` text-sm cursor-pointer p-2 px-3 rounded-full ${selected.includes(size)?'bg-black text-white':'bg-[#F0F0F0] text-[#00000099]'}`}>{size}</p>
                ))}
            </div>
        </div>
     );
}
 
export default SizeSelect;