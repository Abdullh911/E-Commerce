import { useEffect, useState } from "react";
import { Slider } from '@mui/material';
import drop from "../assets/dropShop.svg";
import { useFilter } from "../Hooks/useFilter";
const PriceRange = ({setRange}) => {
    const {updateAttribute,tFilter}=useFilter();
    const [value, setValue] = useState(tFilter.priceRange==undefined?[0,200]:[tFilter.priceRange.min,tFilter.priceRange.max])
    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateAttribute("priceRange",{min:value[0],max:value[1]});
    };
    const [show,setShow]=useState(true);
    return ( 
        <div className={`w-full mt-5 border-b-2  ${show?'h-20 pb-4':'h-0 overflow-hidden pb-10'}  transition-all ease-in-out duration-300`}>
            <div className="mb-3 flex justify-between">
                <h1 className="font-satoshi font-bold">Price</h1>
                <img className="cursor-pointer" onClick={()=>setShow(!show)} src={drop} alt="" />
            </div>
            <div>
                <Slider 
                    max={200}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    sx={{
                        color: 'black',
                        '& .MuiSlider-thumb': {
                            backgroundColor: 'black',
                            
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: '#000000',
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#F0F0F0',
                        },
                    }}
                />
            </div>
        </div>
     );
}
 
export default PriceRange;