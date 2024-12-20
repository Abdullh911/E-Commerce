import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductByIdAndCategory, fetchUserByEmail } from "../Utils/dataFtech";
import ProductInfo from "../Components/ProductInfo";
import Reviews from "../Components/Reviews";
import Loader from "../Components/Loader";
import PartitionDisplay from "../Components/PartitionDisplay";
import { toKebabCaseCombined } from "../Utils/functions";
import { useRecoilState } from "recoil";
import { currUser } from "../StateManagement/State";

const ProductPage = () => {
    const [objData,setObjData]=useState(null);
    const {id,category}=useParams();
    const [user,setUser]=useRecoilState(currUser);
      useEffect(()=>{
        async function renewUser(){
          console.log("hi");
          let userEmail=localStorage.getItem('user');
          if(userEmail){
            let x=await fetchUserByEmail(userEmail);
            console.log(x);
            
            setUser(x)
          }
        }
        renewUser();
      },[]);
    useEffect(()=>{
        console.log(category);
        
        console.log(toKebabCaseCombined(category));
        
        setObjData(null);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });        
        async function getProduct(){
            let obj=await fetchProductByIdAndCategory(category,id);
            console.log(obj);
            
            setObjData(obj);
        }
        getProduct();
    },[category,id]);
    if(!objData) return <div className="relative h-[600px]"><Loader/></div>
    return ( 
        <div className="px-10 lg:px-20">
            <div>
                <ProductInfo product={objData}/>
            </div>
            <Reviews/>
            <PartitionDisplay title={category} main={"You might also like"}/>
        </div>
    );
}
 
export default ProductPage;