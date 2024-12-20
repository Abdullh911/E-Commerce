import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import 'swiper/css';
import left from '../assets/left.svg';
import right from '../assets/right.svg';
import ReviewCard from './ReviewCard';

const HomeReviews = () => {
    const [activeIndex, setActiveIndex] = useState(0); 

    const swiperRef = useRef(null);
    const revs = [
        <ReviewCard width={100} rating={3} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."}/>,
        <ReviewCard width={100} rating={3} name={"John Doe"} date={"Posted on August 15, 2023"} comment={"Great quality! Absolutely worth the purchase. I highly recommend it."}/>,
        <ReviewCard width={100} rating={5} name={"Emily R."} date={"Posted on August 16, 2023"} comment={"Amazing product with excellent customer service. Truly a 5-star experience!"}/>,
        <ReviewCard width={100} rating={4} name={"Michael T."} date={"Posted on August 17, 2023"} comment={"Good fit and quality. Slightly expensive but worth it."}/>,
        <ReviewCard rating={3} width={100} name={"Samantha D."} date={"Posted on August 14, 2023"} comment={"The design is amazing, and I appreciate the attention to detail!"}/>
    ];

    const goNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    return (
        <div className="w-full p-16 my-8">
            <div className="flex items-center justify-between">
                <h1 className="font-integralcf mb-5 text-4xl">OUR HAPPY CUSTOMERS</h1>
                <div className="flex justify-center mt-4 gap-3">
                    <button onClick={goPrev}>
                        <img src={left} alt="Previous" />
                    </button>
                    <button onClick={goNext}>
                        <img src={right} alt="Next" />
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    ref={swiperRef}
                    onSlideChange={handleSlideChange} // Event to track slide changes
                    breakpoints={{
                        640: { slidesPerView: 1.5 },
                        768: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 3.5 },
                        1440: { slidesPerView: 3.5 },
                    }}
                    className="overflow-visible h-80"
                >
                    {revs.map((slide, index) => (
                        <SwiperSlide key={index} className="relative w-80 h-80">
                            <div className={`transition-all duration-300 ${index === activeIndex ? 'blur-0' : 'blur-sm'}`}>
                                {slide}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeReviews;
