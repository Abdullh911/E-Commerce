import { useState } from "react";
import drop from "../assets/dropShop.svg";
import tic from "../assets/tic.svg";
import { useFilter } from "../Hooks/useFilter";
const ColorSelect = () => {
    const {updateAttribute,tFilter}=useFilter();
    const [show,setShow]=useState(true);
    const [selected,setSelected]=useState(tFilter.colors||[]);
    const availableColors = [
        "#008000", // Green
        "#FF0000", // Red
        "#FFFF00", // Yellow
        "#FFA500", // Orange
        "#00FFFF", // Cyan
        "#0000FF", // Blue
        "#FF00FF", // Magenta
        "#FFC0CB", // Pink
        "#FFFFFF", // White
        "#000000", // Black
    ];
    function selectColor(color) {
        let temp;
        if(selected.includes(color)){
            temp=selected.filter((c) => c != color)
            setSelected(temp);
        }
        else{
            temp=[...selected,color]
            setSelected(temp);
        }
        console.log(temp);
        
        updateAttribute("colors",temp);
    }
    return ( 
        <div className={`w-full mt-5 border-b-2  ${show?'h-32 pb-4':'h-0 overflow-hidden pb-8'}  transition-all ease-in-out duration-300`}>
            <div className="mb-3 flex justify-between">
                <h1 className="font-satoshi font-bold">Colors</h1>
                <img className="cursor-pointer" onClick={()=>setShow(!show)} src={drop} alt="" />
            </div>
            <div className="flex flex-wrap gap-[2px] xl:gap-2 ">
                {availableColors.map((color)=>(
                    <div onClick={()=>selectColor(color)} className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center mb-1 border-[1px]`} style={{backgroundColor:color}}>{selected.includes(color)?<img className={`${color=="#FFFFFF"?'p-2 rounded-full bg-gray-400 bg-opacity-20':''}`} src={tic} alt="" />:""}</div>
                ))}
            </div>
        </div>
     );
}
 
export default ColorSelect;