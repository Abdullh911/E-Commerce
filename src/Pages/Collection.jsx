import { useNavigate, useParams } from "react-router-dom";
import ProductsContainer from "../Components/ProductsContainer";
import useGet from "../Hooks/useGet";
import { capitalizeFirstLetter, formatCategoryName, getLength } from "../Utils/functions";
import { useEffect, useMemo, useState } from "react";
import left from '../assets/left.svg';
import right from '../assets/right.svg';
import Filter from "../Components/Filter";
import { filter, openModal } from "../StateManagement/State";
import { useRecoilState } from "recoil";
import filterButton from '../assets/filterButton.svg';
const Collection = () => {
    const { category,pageIndex,path } = useParams();
    const [check,setCheck]=useState(1);
    const [filters,setFilters]=useRecoilState(filter);
    const [modalType,setModalType]=useRecoilState(openModal);
    let navigate=useNavigate();
    const [maxP, setMaxP] = useState(-1);
    const [qnt, setQnt] = useState(-1);
    const { data, error, loading } = useGet("en", pageIndex, qnt, formatCategoryName(category),filters);
    useEffect(() => {
        window.scrollTo(0,0);
        let z = 1;
        if (window.innerWidth < 1024) {
            setQnt(6);
            z = 6;
        } else if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
            setQnt(9);
            z = 9;
        } else if (window.innerWidth >= 1440) {
            setQnt(12);
            z = 12;
        }
        console.log(data);
        async function setLength() {
            setCheck(1);
            const length = await getLength(formatCategoryName(category),filters);
            console.log("Total items:", length);
            if(length==0)setCheck(0);
            setMaxP(Math.ceil(length / z)); 
            console.log("Max pages:", Math.ceil(length / z));
        }
        setLength();

    }, [category,pageIndex,filters]);
    useEffect(() => {
        navigate(`/collection/${path}/${category}/1`, { replace: true });
    }, [filters]);
    

    const handleNext = () => {
        if (Number(pageIndex) < maxP) navigate(`/collection/${path}/${category}/${Number(pageIndex) + 1}`);
    };

    const handlePrevious = () => {
        if (Number(pageIndex) > 1) navigate(`/collection/${path}/${category}/${Number(pageIndex) - 1}`);
    };
    return (
        <div className={`px-5 xl:px-20 justify-between flex gap-5 `}>
            <div className="border-2 h-fit p-5 rounded-[20px] hidden md:flex md:flex-col md:w-[35%] lg:w-[22%] xl:w-[19%]">
                <Filter/>
            </div>
            <div className="w-full md:w-[78%]">
                <h1 className="text-[32px] font-satoshi font-bold p-0 mb-5 flex justify-between">
                    {capitalizeFirstLetter(category)}
                    <img onClick={()=>{
                        window.scrollTo(0,0);
                        setModalType("filter");
                    }} className="scale-125 md:hidden" src={filterButton} alt="" />
                </h1>
                {check==0?<div>No Products found</div>:<ProductsContainer data={data} />}
                {data.length>0&&<div className="mt-10 flex justify-between w-full items-center gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={Number(pageIndex) <= 1}
                        className={`p-1 flex items-center justify-center gap-3 min-w-[30px] max-w-[150px] rounded-md font-satoshi ${
                            Number(pageIndex) <= 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-200"
                        }`}
                    >
                        <img className="block" src={left} alt="Left arrow" />
                        <span className="md:block hidden">Previous</span>
                    </button>

                    {maxP !== -1 && (
                        <div className="flex gap-3">
                            {Array.from({ length: 3 }, (_, index) => Number(pageIndex) + index)
                                .filter((p) => p <= maxP)
                                .map((p) => (
                                    <p
                                        key={p}
                                        onClick={() => navigate(`/collection/${path}/${category}/${p}`)}
                                        className={`p-2 flex justify-center items-center rounded-md font-satoshi w-8 h-8 cursor-pointer ${
                                            p === Number(pageIndex) ? "bg-[#0000000F] " : " hover:bg-gray-300"
                                        }`}
                                    >
                                        {p}
                                    </p>
                                ))}
                            {Number(pageIndex) + 2 < maxP && <p className="p-2">···</p>}

                            {Array.from({ length: 3 }, (_, index) => maxP - 2 + index)
                                .filter((p) => p > Number(pageIndex) + 2)
                                .map((p) => (
                                    <p
                                        key={p}
                                        onClick={() => navigate(`/collection/${path}/${category}/${p}`)}
                                        className="p-2 flex justify-center w-8 h-8 items-center font-satoshi rounded-md cursor-pointer hover:bg-gray-300"
                                    >
                                        {p}
                                    </p>
                                ))}
                        </div>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={Number(pageIndex) >= maxP}
                        className={`p-1 flex items-center justify-center gap-3 min-w-[30px] max-w-[150px] rounded-md font-satoshi ${
                            Number(pageIndex) >= maxP ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-200"
                        }`}
                    >
                        <span className="md:block hidden">Next</span>
                        <img className="block" src={right} />
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default Collection;
