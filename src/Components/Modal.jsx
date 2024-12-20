import { useRecoilState } from "recoil";
import { openModal } from "../StateManagement/State";
import Filter from "./Filter";
import { useEffect } from "react";

const Modal = () => {
    const [modalType,setModalType]=useRecoilState(openModal);
    useEffect(() => {
        if (modalType !== "") {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [modalType])
    return ( 
        <div className={`absolute z-40 bg-white w-full bottom-0 rounded-2xl overflow-scroll ${modalType==""?'h-0':'h-[90%] p-5 border-2'} transition-all ease-in-out duration-300`}>
            
            {(() => {
                if (modalType=="filter") {
                    return <Filter />;
                } else if (modalType=="signup") {
                    return <div></div>;
                } else {
                    return (
                        <div></div>
                    );
                }
            })()}
        </div>
     );
}
 
export default Modal;