import { useParams } from 'react-router-dom';
import filterIcon from '../assets/filter.svg'
import close from '../assets/close.svg'
import ColorSelect from './ColorSelect';
import GenderSelect from './GenderSelect';
import PriceRange from './PriceRange';
import SizeSelect from './SizeSelect';
import StyleSelect from './StyleSelect';
import TypeContainer from './TypeContainer';
import TypeSelect from './TypeSelect';
import { useRecoilState } from 'recoil';
import { filter, openModal, tempFilter } from '../StateManagement/State';
import { createFilter } from '../Utils/functions';
const Filter = () => {
    const {category}=useParams();
    const [mFilters,setMFilters]=useRecoilState(filter);
    const [tFilter,setTFilter]=useRecoilState(tempFilter);
    const [modalType,setModalType]=useRecoilState(openModal);
    return ( 
        <div className='font-satoshi pb-32 md:pb-2'>
            <div className='flex justify-between items-center h-10 pb-7 w-full border-b-2'>
                <h1 className="font-satoshi font-bold">Filters</h1>
                <img onClick={()=>{
                    if(modalType!=""){
                        setModalType("");
                    }
                }} src={modalType==""?filterIcon:close} alt="" />
            </div>
            <TypeSelect/>
            <PriceRange />
            <ColorSelect/>
            <SizeSelect/>
            {(() => {
                if (["men", "boys", "girls", "women"].includes(category)) {
                    return <StyleSelect />;
                } else if (["casual", "party", "formal", "gym"].includes(category)) {
                    return <GenderSelect />;
                } else {
                    return (
                        <>
                            <StyleSelect />
                            <GenderSelect />
                        </>
                    );
                }
            })()}
            <button onClick={()=>{
                console.log(createFilter(tFilter));
                
                setMFilters(createFilter(tFilter));
                setModalType("");
            }} className='text-sm mt-3 w-full text-white bg-black p-3 px-4 rounded-full'>Apply filters</button>
        </div>
     );
}
 
export default Filter;