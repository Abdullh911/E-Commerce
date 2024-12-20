import { useRecoilState } from "recoil";
import { tempFilter } from "../StateManagement/State";

export function useFilter(){
    const [tFilter,setTFilter]=useRecoilState(tempFilter);
    const updateAttribute = (key, value) => {
        setTFilter((prevObj) => ({
            ...prevObj,
            [key]: value,
        }));
    };
    return {tFilter,updateAttribute};
}   