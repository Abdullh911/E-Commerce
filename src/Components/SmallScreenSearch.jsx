import { useState } from "react";
import searchDrop from "../assets/lasrgeSearch.svg";
import search from '../assets/searchIcon.svg'
import SearchResults from "./SearchResults";
const SmallScreenSearch = () => {
    const [query,setQuery]=useState("");
    return ( 
        <div className="group flex flex-col items-center z-10">
            <img className="lg:hidden w-5 h-5" src={search} alt="" />
            <div className="overflow-hidden flex items-center group-hover:border-2 justify-between px-3 w-[90vw] h-0 group-hover:h-fit group-hover:overflow-visible mt-3 absolute  left-1/2 transform -translate-x-[50%] translate-y-5 bg-white rounded-[62px]  transition-all">
                <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className=" focus:outline-none relative left-5 bg-transparent w-[80%] h-0 group-hover:h-10" placeholder="Search for products..." />
                <img className="h-0 group-hover:h-5" src={searchDrop} alt="" />
                <SearchResults setQuery={setQuery} query={query}/>
            </div>
            
        </div>
     );
}
 
export default SmallScreenSearch;