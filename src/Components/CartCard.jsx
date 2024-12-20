import { useEffect, useState, useCallback } from 'react';
import trash from '../assets/Trash.svg';
import { useSelect } from '../Hooks/useSelect';
import { findColorName } from '../Utils/functions';
import { useRecoilState } from 'recoil';
import { currUser } from '../StateManagement/State';
import { updateUser } from '../Utils/dataFtech';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartCard = ({ cartObj, index }) => {
    const [user, setUser] = useRecoilState(currUser);
    const [pieces, setPieces] = useState(cartObj.quantity);
    const { getmax } = useSelect(cartObj);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    useEffect(() => {
        async function update() {
            if (pieces > getmax(cartObj.color, cartObj.size)) {
                setPieces(getmax(cartObj.color, cartObj.size));
                const updatedUser = {
                    ...user,
                    cart: user.cart.map((item, idx) =>
                        idx === index
                            ? { ...item, quantity: getmax(cartObj.color, cartObj.size) }
                            : item
                    ),
                };
                setUser(updatedUser);
                toast.warning("Adjusted quantity to available stock.");
                await updateUser(updatedUser.email, updatedUser);
            }
        }
        update();
    }, [pieces]);

    useEffect(() => {
        setPieces(user.cart[index].quantity);
    }, [user]);

    const updateQuantity = useCallback(async (newQuantity) => {
        const updatedUser = {
            ...user,
            cart: user.cart.map((item, idx) =>
                idx === index
                    ? { ...item, quantity: newQuantity }
                    : item
            ),
        };
        setUser(updatedUser);
        await updateUser(updatedUser.email, updatedUser);
    }, [user, index]);

    const handleQuantityChange = (newQuantity) => {
        setPieces(newQuantity);
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        setDebounceTimeout(setTimeout(() => {
            updateQuantity(newQuantity);
        }, 300));
    };

    const increment = () => {
        if (pieces < getmax(cartObj.color, cartObj.size)) {
            handleQuantityChange(pieces + 1);
        }
    };

    const decrement = () => {
        if (pieces > 1) {
            handleQuantityChange(pieces - 1);
        }
    };

    const removeItem = async () => {
        const updatedUser = {
            ...user,
            cart: user.cart.filter((_, idx) => idx !== index),
        };
        setUser(updatedUser);
        await updateUser(updatedUser.email, updatedUser);
    };

    return (
        <>
            <div className='w-36 h-36 bg-[#F0EEED] flex justify-center items-center rounded-xl'>
                <img className='w-32 h-32 mix-blend-darken' src={cartObj.productImg} alt="" />
            </div>
            <div className='w-full flex flex-col justify-between'>
                <div className='flex justify-between'>
                    <h1>{cartObj.title}</h1>
                    <img onClick={removeItem} className='w-5 h-5 cursor-pointer' src={trash} alt="" />
                </div>
                <p className='text-black'>Size: <span className='text-[#00000099]'>{cartObj.size}</span></p>
                <p className='text-black'>Color: <span className='text-[#00000099]'>{findColorName(cartObj.color)}</span></p>
                <div className='flex justify-between items-center'>
                    <h2>${cartObj.price}</h2>
                    <div className="flex bg-[#F0F0F0] p-1 px-2 w-[35%] md:w-[19%] rounded-full justify-between items-center">
                        <button onClick={decrement} className="text-3xl">−</button>
                        <p>{pieces}</p>
                        <button onClick={increment} className="text-3xl">+</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartCard;
