import user from "../assets/user.svg";
const LoadingUserMenu = () => {
    return ( 
        <div className="group relative ">
            <img src={user} alt="" />
            <div className="z-10 shadow-lg flex flex-col justify-around absolute h-0 rounded-lg group-hover:h-44 group-hover:p-4 right-0 overflow-hidden transition-all ease-in-out duration-300 bg-white ">
                <div class="animate-pulse flex flex-col items-center gap-4 w-20">
                    
                    <div class="h-7 bg-slate-400 w-full rounded-md"></div>
                    <div class="h-7 bg-slate-400 w-full rounded-md"></div>
                    <div class="h-7 bg-slate-400 w-full rounded-md"></div>
                    <div class="h-7 bg-slate-400 w-1/2 rounded-md"></div>
                </div>
            </div>
        </div>
     );
}
 
export default LoadingUserMenu;