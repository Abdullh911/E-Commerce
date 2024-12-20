import versace from '../assets/Versace.png';
import zara from '../assets/zara-logo-1 1.png';
import gucci from '../assets/gucci-logo-1 1.png';
import prada from '../assets/prada-logo-1 1.png';
import ck from '../assets/ck.png';
const Brands = () => {
    const brands=[versace,zara,gucci,prada,ck];
    return ( 
        <div className="w-full h-fit p-6 bg-black flex flex-wrap gap-3 justify-around">
            {brands.map((brand)=>(
                <img className=" " src={brand} alt="" />
            ))}
        </div>
     );
}
 
export default Brands;