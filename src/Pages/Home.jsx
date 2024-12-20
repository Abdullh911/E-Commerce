import Brands from "../Components/Brands";
import Browser from "../Components/Browser";
import Footer from "../Components/Footer";
import HomeReviews from "../Components/HomeReviews";
import NewSettler from "../Components/NewSettler";
import PartitionDisplay from "../Components/PartitionDisplay";
import ProductCard from "../Components/ProductCard";
import StoreInfo from "../Components/StoreInfo";
import models from '../assets/Rectangle 2.png';
import bigStar from '../assets/bigStar.svg';
import smallStar from '../assets/smallStar.svg';

const Home = () => {
    return (
        <div className="w-full">
            <div className="w-full bg-[#F2F0F1] flex flex-wrap items-stretch">
                <StoreInfo />
                <div className="flex-1 bg-[#F2F0F1] lg:w-1/2 relative w-full h-[500px] mt-5 md:h-screen bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${models})` }}>
                    <h1 className="text-transparent">hjghghfh</h1>
                    <img className="absolute top-1/2" src={smallStar} alt="" />
                    <img className="absolute right-3 top-[5%] lg:top-1/3" src={bigStar} alt="" />
                </div>
            </div>
            <Brands/>
            <PartitionDisplay title={"New Arrivals"}/>
            <PartitionDisplay title={"Top Selling"}/>
            <Browser/>
            <HomeReviews/>
            
        </div>
    );
}

export default Home;
