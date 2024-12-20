import { useState } from "react";
import rightDrop from '../assets/rightDrop.svg'
import one from '../assets/one-circle.svg';
import drop from "../assets/dropShop.svg";
import { useFilter } from "../Hooks/useFilter";
const StyleSelect = () => {
    const {updateAttribute,tFilter}=useFilter();
    const [show,setShow]=useState(true);
    const [selected,setSelected]=useState(tFilter.category||[]);
    function selectStyle(style) {
        let temp;
        if(selected.includes(style)){
            temp=selected.filter((c) => c != style);
            setSelected(temp);
        }
        else{
            temp=[...selected,style];
            setSelected(temp);
        }
        updateAttribute("category",temp);
    }
    const styles=["Casual","Formal","Party", "Gym"]
    return ( 
        <div className={`w-full mt-5  ${show?'h-[165px] pb-6':'h-0 overflow-hidden pb-8'}  transition-all ease-in-out duration-300`}>
            <div className="mb-3 flex justify-between">
                <h1 className="font-satoshi font-bold">Dress Style</h1>
                <img className="cursor-pointer" onClick={()=>setShow(!show)} src={drop} alt="" />
            </div>
            <div className="flex flex-col gap-2">
                {styles.map((style)=>(
                    <div onClick={()=>selectStyle(style)} className="flex justify-between items-center cursor-pointer">
                        <p>{style}</p>
                        <img src={selected.includes(style)?one:rightDrop} alt="" />
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default StyleSelect;