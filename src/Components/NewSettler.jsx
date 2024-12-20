const NewSettler = () => {
    return ( 
        <div className="bg-black p-10 rounded-[20px] w-full flex justify-between flex-wrap">
            <h1 className="font-integralcf mb-5 text-xl lg:text-4xl text-white w-full md:w-[40%]">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
            <div className="flex flex-col gap-3 font-satoshi items-center">
                <input className="p-1 rounded-full  md:w-80" type="text"  placeholder="Enter your email address"/>
                <button className="bg-white rounded-full p-2">Subscribe to Newsletter</button>
            </div>
        </div>
     );
}
 
export default NewSettler;