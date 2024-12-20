import filter from '../assets/filter.svg';
import drop from '../assets/dropShop.svg';
import rev1 from '../assets/Frame 22.jpg';
import rev2 from '../assets/Frame 23.jpg';
import rev3 from '../assets/Frame 24.jpg';
import PartitionDisplay from './PartitionDisplay';
import ReviewCard from './ReviewCard';
const Reviews = () => {
    const revs = [rev1, rev2, rev3, rev1, rev2, rev3];
    return ( 
        <div className='mt-5'>
            <div className='flex justify-between items-center text-xs md:text-xl'>
                <h1 className='text-xl font-semibold font-satoshi whitespace-nowrap'>All Reviews</h1>
                <div className='flex gap-3'>
                    <button className='bg-[#F0F0F0] p-2 rounded-full w-12 h-12 flex justify-center items-center'><img src={filter} alt="" /></button>
                    <button className='flex justify-center items-center bg-[#F0F0F0] p-2 px-3 rounded-full'>Latest <img src={drop} alt="" /></button>
                    <button className='p-2 md:px-4 bg-black text-white rounded-full'>Write a Review</button>
                </div>
            </div>
            <div className='flex  flex-wrap gap-3 mt-5'>
                <ReviewCard rating={3} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."}/>
                <ReviewCard rating={3} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."}/>
                <ReviewCard rating={3} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."}/>
                <ReviewCard rating={3} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."}/>
                <ReviewCard rating={3} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."}/>
                <ReviewCard rating={3} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."}/>
            </div>
            <div className='flex justify-center items-center'>
                <button className='mt-5 p-3 rounded-full border-[#0000001A] px-20 border-2'>Load More Reviews</button>
            </div>
            
        </div>
     );
}
 
export default Reviews;