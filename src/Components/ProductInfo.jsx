import { useEffect } from "react";
import ImageViewer from "./ImageViewer";
import ProductDescription from "./ProductDescription";

const ProductInfo = ({product}) => {
    return ( 
        <div className="flex gap-7 flex-wrap xl:flex-nowrap">
            <ImageViewer images={product.images}/>
            <ProductDescription product={product}/>
        </div>
     );
}
 
export default ProductInfo;