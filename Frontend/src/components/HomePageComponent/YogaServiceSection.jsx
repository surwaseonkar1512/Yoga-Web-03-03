import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";

const services = [
  {
    title: "Vrikshasana",
    trainer: "Hatha Yoga Trainer",
    image:
      "https://designingmedia.com/yogadelight/wp-content/uploads/2024/06/Yoga-img-3.jpg",
  },
  {
    title: "Dhanurasana",
    trainer: "Power Yoga Trainer",
    image:
      "https://yoge-demo.pbminfotech.com/demo3/wp-content/uploads/sites/4/2023/08/blog-img-01.jpg",
  },
  {
    title: "Bhujangasana",
    trainer: "Ashtanga Yoga Trainer",
    image:
      "https://designingmedia.com/yogastic/wp-content/uploads/2023/03/blog4-1.jpg",
  },
  {
    title: "Vrikshasana",
    trainer: "Hatha Yoga Trainer",
    image:
      "https://designingmedia.com/yogadelight/wp-content/uploads/2024/06/Yoga-img-3.jpg",
  },
  {
    title: "Dhanurasana",
    trainer: "Power Yoga Trainer",
    image:
      "https://yoge-demo.pbminfotech.com/demo3/wp-content/uploads/sites/4/2023/08/blog-img-01.jpg",
  },
  {
    title: "Bhujangasana",
    trainer: "Ashtanga Yoga Trainer",
    image:
      "https://designingmedia.com/yogastic/wp-content/uploads/2023/03/blog4-1.jpg",
  },
  {
    title: "Vrikshasana",
    trainer: "Hatha Yoga Trainer",
    image:
      "https://designingmedia.com/yogadelight/wp-content/uploads/2024/06/Yoga-img-3.jpg",
  },
  {
    title: "Dhanurasana",
    trainer: "Power Yoga Trainer",
    image:
      "https://yoge-demo.pbminfotech.com/demo3/wp-content/uploads/sites/4/2023/08/blog-img-01.jpg",
  },
  {
    title: "Bhujangasana",
    trainer: "Ashtanga Yoga Trainer",
    image:
      "https://designingmedia.com/yogastic/wp-content/uploads/2023/03/blog4-1.jpg",
  },
];

const YogaServiceSection = () => {
  const swiperRef = useRef(null);

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
                {services.map((service, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white text-black">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-sm font-bold rounded-full">
                        {service.trainer}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold">
                          {service.title}
                        </h3>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full">
                        <FaArrowRight className="text-green-900" />
                      </div>
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
