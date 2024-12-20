import { useStar } from "../Hooks/useStar";
import ellipsis from '../assets/ellipsis.svg';
import verified from '../assets/verified.svg';
const ReviewCard = ({rating,comment,name,date,width}) => {
    const stars=useStar(rating);
    return ( 
        <div className={`${width?'w-full min-h-64':'w-full md:w-[49.5%]'} font-satoshi  flex flex-col gap-3 border-2 rounded-xl p-5`}>
            <div className="flex justify-between">
                <div className="flex gap-1">
                    {stars.map((star)=>(
                        <img  className="w-5 h-auto" src={star} alt="" />
                    ))}
                </div>
                <img src={ellipsis} alt="" />
            </div>
            <div className="flex gap-2">
                <h2 className="font-bold">{name}</h2>
                <img src={verified} alt="" />
            </div>
            <p className="text-[#00000099]">{comment}</p>
            <p className="text-[#00000099] font-semibold">{date}</p>
        </div>
     );
}
 
export default ReviewCard;