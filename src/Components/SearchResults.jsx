import { useEffect, useState } from "react";
import { fetchFilteredSearchResults } from "../Utils/dataFtech";
import SearchCards from "./SearchCards";
import useDebounce from "../Hooks/useDebounce";

const SearchResults = ({setQuery, query }) => {
    const [data, setData] = useState([]);
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        async function fetchSearchRes() {
            if (debouncedQuery === "") {
                setData([]);
                return;
            }
            try {
                const results = await fetchFilteredSearchResults(
                    { title: { $regex: debouncedQuery, $options: "i" } },
                    1,
                    5
                );
                setData(results);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
        fetchSearchRes();
    }, [debouncedQuery]);

    return (
        <div
            className={`absolute ${
                query === "" ? "h-0 overflow-hidden" : "h-fit p-3"
            } bg-white z-30 top-12 w-full rounded-b-2xl transition-all ease-in-out duration-300`}
        >
            {data.map((res) => (
                <SearchCards setQuery={setQuery} key={res._id} product={res} />
            ))}
        </div>
    );
};

export default SearchResults;
