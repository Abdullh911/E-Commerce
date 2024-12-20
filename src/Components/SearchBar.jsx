import { useState } from "react";
import search from "../assets/lasrgeSearch.svg";
import SearchResults from "./SearchResults";

const SearchBar = () => {
    const [query, setQuery] = useState("");

    return ( 
        <div className="hidden lg:flex w-[40%] p-3 bg-[#F0F0F0] rounded-[62px] gap-4 relative">
            <img src={search} alt="Search Icon" />
            <input 
                onChange={(e) => setQuery(e.target.value)} 
                className="w-[100%] bg-transparent focus:outline-none" 
                placeholder="Search for products..." 
                type="text" 
                value={query} 
            />
            
            <SearchResults setQuery={setQuery} query={query}/>
        </div>
    );
}
 
export default SearchBar;
