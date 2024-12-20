import React, { useState } from 'react';
import { addUser, signupWithEmailAndPassword } from '../Utils/dataFtech';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    let userObj={
        Fname:formData.firstName,
        Lname:formData.lastName,
        email:formData.email,
        password:formData.password,
        orders:[],
        cart:[]
    }
    let temp=await signupWithEmailAndPassword(userObj.email,userObj.password);
    if(!temp.success)return;
    let user=await addUser(userObj);
    localStorage.setItem('user', user.email);
    navigate('/');
    window.location.reload();
  };
  return (
    <div className="flex justify-center items-center">
      <section>
        <div className="bg-white rounded-xl shadow-2xl relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black">Sign Up</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="******"
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="******"
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <button
                    type="submit"
                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
