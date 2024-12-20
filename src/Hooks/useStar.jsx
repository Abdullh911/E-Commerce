import { useEffect, useState } from "react";
import bigStar from '../assets/Star 1.svg';
import smallStar from '../assets/Star 5.svg';
export function useStar(rating){
    const [stars,setStars]=useState([]);
    useEffect(()=>{
        let x=rating;
        let temp=[];
        while(x>0.5){
            temp.push(bigStar);
            x--;
        }
        if(x==0.5){
            temp.push(smallStar);
        }
        setStars(temp);
    },[]);
    return stars;
}