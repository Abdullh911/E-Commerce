import { useEffect, useState } from 'react';
import drop from '../assets/dropShop.svg';
import { findColorName } from '../Utils/functions';
const OrderCard = ({orderObj}) => {
    const [show,setShow]=useState(false);
    function extend(){
        setShow(prev=>!prev);
    }
    return ( 
        <div className='relative flex flex-col border-2 p-3 rounded-xl font-satoshi '>
            <span className='absolute top-2 right-2 cursor-pointer'><img onClick={extend} src={drop} alt="" /></span>
            <div className='break-words'>
                <h1 className=''>order Number #{orderObj.orderNumber}</h1>
                <h2>Total: ${orderObj.total}</h2>
            </div>
            <div className={`${show ? 'max-h-screen p-2 ' : 'max-h-0'} flex flex-col gap-2 overflow-hidden  rounded-xl  transition-all ease-in-out duration-300`}>
                {orderObj.products.map((product) =>(
                    <div className='border-2 rounded-xl p-2 flex gap-4'>
                        <div className='w-36 h-36 bg-[#F0EEED] flex justify-center items-center rounded-xl'>
                            <img className='w-32 h-32 mix-blend-darken' src={product.productImg} alt="" />
                        </div>
                        <div className='w-full flex flex-col justify-between'>
                            <div className='flex justify-between'>
                                <h1 className='font-semibold'>{product.title}</h1>
                            </div>
                            <p className='text-black'>Size: <span className='text-[#00000099]'>{product.size}</span></p>
                            <p className='text-black'>Color: <span className='text-[#00000099]'>{findColorName(product.color)}</span></p>
                            <div className='flex justify-between items-center'>
                                <h2>${product.price}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default OrderCard;