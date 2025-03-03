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
    <section
      className="relative py-16 bg-green-900 text-white bg-no-repeat bg-fixed bg-cover"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/1283380911/photo/yoga-group-on-the-beach-silhouettes-of-people-meditating-in-lotus-position.jpg?s=612x612&w=0&k=20&c=_XCIP5RWTC1nTVZyNRz65d-oGqWOKQR6CWkphD-QV34=")`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content Container */}
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-white text-green-900 font-semibold rounded-full">
            NEW SERVICE
          </span>
          <h2 className="text-4xl font-bold mt-4">
            Explore More Yoga Practices
          </h2>
        </div>

        {/* Swiper Slider Container */}
        <div className="relative w-full flex justify-center items-center">
          <div className="absolute w-[90%] h-full bg-green-800 rounded-2xl -z-10 transform translate-y-14"></div>

          {/* Swiper Component */}
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mt-8 w-full px-6"
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
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full">
                    <FaArrowRight className="text-green-900" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-3 bg-white text-green-900 rounded-full shadow-lg"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-3 bg-white text-green-900 rounded-full shadow-lg"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default YogaServiceSection;
