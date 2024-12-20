import { useState } from "react";
import rightDrop from '../assets/rightDrop.svg'
import one from '../assets/one-circle.svg';
import drop from "../assets/dropShop.svg";
import { useFilter } from "../Hooks/useFilter";
import { tempFilter } from "../StateManagement/State";
import { useRecoilState } from "recoil";
const GenderSelect = () => {
    const [show,setShow]=useState(true);
    const {updateAttribute,tFilter}=useFilter();
    const [selected,setSelected]=useState(tFilter.gender||[]);
    function selectGender(gender) {
        let temp;
        if(selected.includes(gender)){
            temp=selected.filter((c) => c != gender);
            setSelected(temp);
        }
        else{
            temp=[...selected,gender];
            setSelected(temp);
        }
        updateAttribute("gender",temp);
    }
    const genders=["Men","Women","Boys","Girls"]
    return ( 
        <div className={`w-full mt-5  ${show?'h-[165px] pb-6':'h-0 overflow-hidden pb-8'}  transition-all ease-in-out duration-300`}>
            <div className="mb-3 flex justify-between">
                <h1 className="font-satoshi font-bold">Gender</h1>
                <img className="cursor-pointer" onClick={()=>setShow(!show)} src={drop} alt="" />
            </div>
            <div className="flex flex-col gap-2">
                {genders.map((gender)=>(
                    <div onClick={()=>selectGender(gender)} className="flex justify-between items-center cursor-pointer">
                        <p>{gender}</p>
                        <img src={selected.includes(gender)?one:rightDrop} alt="" />
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default GenderSelect;