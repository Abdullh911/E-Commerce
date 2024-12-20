import { useState, useEffect } from "react";
import { fetchFilteredCategory } from "../Utils/dataFtech";

function useGet(lang,page, pageSize, category, filter) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function getDocData() {
            try {
                setLoading(true);
                setData([]);
                const d = await fetchFilteredCategory(category, filter, page, pageSize);
                console.log(d);
                setData(d || []);  
                setLoading(false);
            } catch (err) {
                setError("Can't fetch data");
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        }
        if(pageSize!=-1)getDocData();
        
    }, [page, pageSize, category, filter]);

    return { data, error, loading };
}

export default useGet;
