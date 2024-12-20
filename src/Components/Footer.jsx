import logo from "../assets/SHOP.CO.png";
import p1 from '../assets/1.svg';
import p2 from '../assets/2.svg';
import p3 from '../assets/3.svg';
import p4 from '../assets/4.svg';
const Footer = () => {
    return ( 
        <div className="bg-[#F2F0F1]">
            <div className="px-16 flex justify-between flex-wrap gap-10">
                <div className="w-full lg:w-[15%] flex flex-col gap-10">
                    <img className="w-28 h-7" src={logo} alt="" />
                    <p className="text-[#00000099] font-satoshi">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                    <div className="flex gap-2">
                        <img src={p1} alt="" /><img src={p2} alt="" /><img src={p3} alt="" /><img src={p4} alt="" />
                    </div>
                </div>
                <div className="w-[40%] lg:w-[15%] flex flex-col gap-6 font-satoshi">
                    <p>COMPANY</p>
                    <p className="text-[#00000099] text-md">About</p>
                    <p className="text-[#00000099] text-md">Features</p>
                    <p className="text-[#00000099] text-md">Works</p>
                    <p className="text-[#00000099] text-md">Career</p>
                </div>
                <div className="w-[40%] lg:w-[15%] flex flex-col gap-6 font-satoshi">
                    <p>HELP</p>
                    <p className="text-[#00000099] text-md">Customer Support</p>
                    <p className="text-[#00000099] text-md">Delivery Details</p>
                    <p className="text-[#00000099] text-md">Terms & Conditions</p>
                    <p className="text-[#00000099] text-md">Privacy Policy</p>
                </div>
                <div className="w-[40%] lg:w-[15%] flex flex-col gap-6 font-satoshi">
                    <p>FAQ</p>
                    <p className="text-[#00000099] text-md">Account</p>
                    <p className="text-[#00000099] text-md">Manage Deliveries</p>
                    <p className="text-[#00000099] text-md">Orders</p>
                    <p className="text-[#00000099] text-md">Payments</p>
                </div>
                <div className="w-[40%] lg:w-[15%] flex flex-col gap-6 font-satoshi">
                    <p>RESOURCES</p>
                    <p className="text-[#00000099] text-md">Free eBooks</p>
                    <p className="text-[#00000099] text-md">Development Tutorial</p>
                    <p className="text-[#00000099] text-md">How to - Blog</p>
                    <p className="text-[#00000099] text-md">Youtube Playlist</p>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;