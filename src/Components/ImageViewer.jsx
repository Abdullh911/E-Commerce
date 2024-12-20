import { useEffect, useState } from "react";

const ImageViewer = ({images}) => {
    const [selected,setSelected]=useState(images[0]);
    useEffect(()=>{
        setSelected(images[0])
    },[images])
    return ( 
        <div className="flex flex-col-reverse xl:flex-row xl:w-1/2 xl:h-[600px]  gap-3">
            <div className="flex justify-between xl:flex-col xl:w-[25%] gap-4">
                {images.map((img)=>(
                    <div className={`flex justify-center items-center h-32 md:h-52 ${selected==img?'border-black border-2':''} bg-[#F0EEED] rounded-[20px] overflow-hidden`}>
                        <img className="object-cover mix-blend-darken" onClick={()=>setSelected(img)} src={img} alt="" />
                    </div>
                ))}
            </div>
            <div className="xl:w-[75%] bg-[#F0EEED] rounded-[20px] overflow-hidden flex justify-center items-center">
                <img className="h-80 xl:h-full mix-blend-darken" src={selected} alt="" />
            </div>
        </div>
    );
}
 
export default ImageViewer;