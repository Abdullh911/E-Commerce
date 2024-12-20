import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currUser } from "../StateManagement/State";

export function useSelect(product){
    const [colors,setColors]=useState([]);
    const [sizes,setSizes]=useState([]);
    const [selectedColor,setSelectedColor]=useState("");
    const [selectedSize,setSelectedSize]=useState("");
    const [user,setUser]=useRecoilState(currUser);
    useEffect(()=>{
        let tempColors=[];
        let tempSizes=[];
        product.availablePieces.map((piece)=>{
            if(!tempColors.includes(piece.color)){
                tempColors.push(piece.color);
            }
            if(!tempSizes.includes(piece.size)){
                tempSizes.push(piece.size);
            }
        });
        console.log(tempSizes);
        
        let i=0;
        while(i<product.availablePieces.length&&product.availablePieces[i].numOfPieces==0){
            i++;
        }
        setColors(tempColors);
        setSizes(tempSizes);
        setSelectedColor(product.availablePieces[i].color);
        setSelectedSize(product.availablePieces[i].size);
    },[]);
    function getmax(color,size){

        for(let i=0;i<product.availablePieces.length;i++){
            if(product.availablePieces[i].color==color && product.availablePieces[i].size==size){
                return product.availablePieces[i].numOfPieces;
            }
        }
    }
    return{colors,sizes,getmax,selectedColor,selectedSize,setSelectedColor,setSelectedSize}
}