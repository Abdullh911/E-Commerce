import React from "react";

const Stats = ({head,details}) => {
    return ( 
        <div className="font-satoshi  lg:w-[fit]">
            <h1 className="text-[30px]  lg:text-[40px] font-bold">{head}</h1>
            <p className="text-[15px]  lg:text-[15px] text-gray-500">{details}</p>
        </div>
     );
}
 
export default React.memo(Stats);