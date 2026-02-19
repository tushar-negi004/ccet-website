import { useState, useEffect } from "react";

import NoticePanel from './NoticePanel'
import VisionMission from './VissionMission.jsx'
import NewsPanel from './NewsPanel'
import Contact from './ContactUs'
import AboutUsSection from './AboutUsSection'
import NewAlumni from './NewAlumni'
import Gallery from './Gallery'
import EventCalendar from './EventCalendar'
import Achievements from './Achievements';
import RecentUpdates from "./RecentUpdates.jsx";

// Carousel Images
import banner1 from "../../assets/home/banner1.png";
import banner2 from "../../assets/home/banner2.png";
import banner3 from "../../assets/home/banner3.png";

function Home() {

    const banners = [banner1, banner2, banner3];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === banners.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const goToPrev = () => {
        setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div>

            {/* ===== Banner Carousel ===== */}
            <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">

                <style>
                    {`
                        .carousel-slide {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transition: opacity 1s ease-in-out, transform 6s ease-in-out;
                        }

                        .active-slide {
                            opacity: 1;
                            transform: scale(1.05);
                            z-index: 1;
                        }

                        .inactive-slide {
                            opacity: 0;
                            transform: scale(1);
                            z-index: 0;
                        }
                    `}
                </style>

                {banners.map((banner, index) => (
                    <img
                        key={index}
                        src={banner}
                        alt={`Banner ${index + 1}`}
                        className={`carousel-slide ${
                            index === currentIndex
                                ? "active-slide"
                                : "inactive-slide"
                        }`}
                    />
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute top-1/2 left-6 -translate-y-1/2 
                               bg-black/40 hover:bg-black/60 
                               text-white text-2xl px-4 py-2 
                               rounded-full transition duration-300"
                >
                    ❮
                </button>

                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-6 -translate-y-1/2 
                               bg-black/40 hover:bg-black/60 
                               text-white text-2xl px-4 py-2 
                               rounded-full transition duration-300"
                >
                    ❯
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
                    {banners.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                index === currentIndex
                                    ? "bg-white scale-125"
                                    : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>

            </div>

            {/* ===== Rest of Page ===== */}

            <RecentUpdates />

            <AboutUsSection />

            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center px-4">
                <VisionMission />
                <div className="flex justify-center items-center">
                    <NewsPanel />
                </div>
            </div>

            <EventCalendar />

            <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch px-4">
                <div className="flex-1">
                    <NoticePanel />
                </div>
                <div className="flex-1">
                    <Achievements />
                </div>
            </div>

            <Gallery />
            <NewAlumni />
            <Contact />

        </div>
    )
}

export default Home;
