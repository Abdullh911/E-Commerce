import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currUser } from '../StateManagement/State';
import { updateUser } from '../Utils/dataFtech';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [user,setUser]=useRecoilState(currUser);
  const [total,setTotal]=useState(0);
  const navigate=useNavigate();
  useEffect(() => {
        function reCalculateTotal(updatedUser){
            let x=0;
            for(let i=0;i<updatedUser.cart.length;i++){
                let temp=updatedUser.cart[i].price;
                x+=temp*updatedUser.cart[i].quantity;
            }
            return x;
        }
        setTotal(reCalculateTotal(user));
    }, []);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    paymentMethod: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePaymentChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isCreditCard = formData.paymentMethod === "creditCard";
    const isCash = formData.paymentMethod === "cash";
    const allFilled =
      formData.name &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zip &&
      formData.country &&
      (isCash || (formData.cardNumber && formData.expiry && formData.cvv));

    if (!allFilled) {
      toast.error("Please fill in all required fields.");
      return;
    }

    formData.products = user.cart;
    formData.total = total;
    let date = `${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}_${new Date().getHours().toString().padStart(2, '0')}${new Date().getMinutes().toString().padStart(2, '0')}${new Date().getSeconds().toString().padStart(2, '0')}`;
    formData.orderNumber=date+user._id;

    const updatedUser = {
      ...user,
      cart: [],
      orders: [...user.orders, formData],
    };

    let newUser = await updateUser(user.email, updatedUser);
    if (newUser) {
      setUser(newUser);
      toast.success("Order placed successfully!");
      setTimeout(() => {
        navigate('/');
    }, 5000);
    } else {
      toast.error("Failed to place the order. Try again.");
    }
  };

  return (
    <form
      className="mt-4 flex flex-col bg-gray-100 rounded-lg p-4 shadow-lg "
      onSubmit={handleSubmit}
    >
      <h2 className="text-black font-bold text-lg flex justify-between">Shipping Label Address Form <span>${total+15}</span></h2>

      <div className="mt-4">
        <label className="text-black" htmlFor="name">Name</label>
        <input
          placeholder="Your name"
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4">
        <label className="text-black" htmlFor="address">Address</label>
        <textarea
          placeholder="Your address"
          className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
          id="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4 flex flex-row space-x-2">
        <div className="flex-1">
          <label className="text-black" htmlFor="city">City</label>
          <input
            placeholder="Your city"
            className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
            id="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <label className="text-black" htmlFor="state">State</label>
          <input
            placeholder="Your state"
            className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
            id="state"
            type="text"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-row space-x-2">
        <div className="flex-1">
          <label className="text-black" htmlFor="zip">ZIP</label>
          <input
            placeholder="Your ZIP code"
            className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
            id="zip"
            type="text"
            value={formData.zip}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <label className="text-black" htmlFor="country">Country</label>
          <select
            className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
            id="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="eg">Select a country</option>
            <option value="egypt">egypt</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-black font-bold">Payment Method</h3>
        <div className="flex flex-col mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Cash on Delivery
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={formData.paymentMethod === 'creditCard'}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Credit Card
          </label>
        </div>
      </div>

      {formData.paymentMethod === 'creditCard' && (
        <div className="mt-4 bg-white p-4 rounded-md shadow-sm">
          <h3 className="text-black font-bold">Credit Card Details</h3>
          <div className="mt-2">
            <label className="text-black" htmlFor="cardNumber">Card Number</label>
            <input
              placeholder="1234 5678 9012 3456"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <label className="text-black" htmlFor="expiry">Expiry Date</label>
            <input
              placeholder="MM/YY"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              type="text"
              id="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <label className="text-black" htmlFor="cvv">CVV</label>
            <input
              placeholder="123"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              type="password"
              id="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          className="bg-white text-black rounded-md px-4 py-1 hover:bg-gray-200 hover:text-gray-900"
          type="submit"
        >
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
