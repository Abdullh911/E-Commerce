import casual from '../assets/casualB.png';
import formal from '../assets/formalB.png';
import party from '../assets/partyB.png';
import gym from '../assets/gymB.png';
import casualSmall from '../assets/casualSmall.png';
import formalSmall from '../assets/formalSmall.png';
import partySmall from '../assets/partySmall.png';
import gymSmall from '../assets/gymSmall.png';
import { useNavigate } from 'react-router-dom';

const Browser = () => {
    const navigate=useNavigate();
    function nav(cat){
        navigate(`/collection/${"Home-"+cat}/${cat}/${1}`)
    }
    return (
        <div className="w-full px-16">
            <div className="flex flex-col items-center bg-[#F0F0F0] rounded-[40px] w-fit p-10">
                <h1 className="font-integralcf mb-5 text-4xl">Browse By Dress Style</h1>
                <div className="flex flex-wrap gap-5 justify-center">
                    <picture>
                        <source media="(min-width: 1440px)" srcSet={casual} />
                        <img className='cursor-pointer' onClick={()=>nav("casual")}  src={casualSmall} alt="Casual" />
                    </picture>
                    <picture>
                        <source media="(min-width: 1440px)" srcSet={formal} />
                        <img className='cursor-pointer' onClick={()=>nav("formal")} src={formalSmall} alt="Formal" />
                    </picture>
                    <picture>
                        <source media="(min-width: 1440px)" srcSet={party} />
                        <img className='cursor-pointer' onClick={()=>nav("party")} src={partySmall} alt="Party" />
                    </picture>
                    <picture>
                        <source media="(min-width: 1440px)" srcSet={gym} />
                        <img className='cursor-pointer' onClick={()=>nav("gym")} src={gymSmall} alt="Gym" />
                    </picture>
                </div>
            </div>
        </div>
    );
};

export default Browser;
