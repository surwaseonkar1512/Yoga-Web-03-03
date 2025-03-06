import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import { getCategories } from "../../services/operations/YogaCategory";
import { Link } from "react-router-dom";



const YogaServiceSection = () => {
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        // setError("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);
  console.log("categories", categories);

  return (
    <>
      <section className="relative md:py-16 py-8 bg-white text-white overflow-hidden">
        {/* Background Shape (Stays Behind Everything) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-500 "
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)",
          }}
        ></div>

        {/* Content Container */}
        <div className="relative container mx-auto px-6 z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="px-4 py-2 bg-white text-green-900 font-semibold rounded-full">
              NEW SERVICE
            </span>
            <h2 className="text-4xl font-bold mt-4">
              Explore More Yoga Practices
            </h2>
          </div>

          {/* Slider Section - Positioned in Front */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative w-full flex flex-col justify-end items-end z-10 col-span-3 gap-3  md:-right-8">
              {/* Swiper Component */}
              <Swiper
                ref={swiperRef}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 2 },
                }}
                className="mt-8 w-full md:px-6 px-0"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {categories.map((service, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden   text-black transition-transform duration-300 hover:scale-105 hover:shadow-2xl my-4">
                      {/* Image Section */}
                      <div className="relative w-full h-72 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-sm font-bold rounded-full shadow-md">
                          {service.name}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 space-y-2 bg-white">
                        <h3 className="text-sm font-semibold text-gray-800">
                          {service.heading}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {service?.paragraph}
                        </p>
                      </div>

                      {/* Button - Positioned Properly */}
                      <Link
                        to={`/yogaCategroy/${service?.slug}`}
                        className="absolute bottom-32 right-4 bg-green-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-green-600 hover:scale-110"
                      >
                        <FaArrowRight className="text-white text-lg -rotate-45" />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className=" flex justify-end gap-4 mr-10">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="p-3 text-white bg-green-900 rounded-full shadow-lg"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="p-3 text-white bg-green-900 rounded-full shadow-lg"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            <div className="col-span-2">
              <div className="relative w-full flex justify-start">
                <div className="relative w-full -mt-20">
                  <img
                    src="https://theme.creativemox.com/zenyoga/wp-content/uploads/sites/39/2024/04/img_4.png" // Change this to your actual image path
                    alt="Yoga Pose"
                    className="w-full h-[600px] object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Custom Navigation Buttons */}
        </div>
      </section>
    </>
  );
};

export default YogaServiceSection;
