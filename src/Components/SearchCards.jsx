import { useNavigate } from "react-router-dom";

const SearchCards = ({product ,setQuery}) => {
    const navigate=useNavigate();
    return ( 
        <div onClick={()=>{
            setQuery("");
            navigate(`/product/${product.category}/${product.id}`);
        }} className="flex mb-3 cursor-pointer hover:bg-[#F0F0F0]">
            <img className="object-fill w-10 h-10" src={product.images[0]} alt="" />
            <p>{product.title}</p>
        </div>
     );
}
 
export default SearchCards;