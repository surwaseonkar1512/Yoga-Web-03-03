import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const bannerData = [
  {
    id: 1,
    background:
      "https://cdn.pixabay.com/photo/2020/08/22/12/36/yoga-5508336_1280.png",
    title: "Relax your mind and body.",
    description:
      "You cannot always control what goes on outside, but you can always control what goes on inside! Happy Yoga Day.",
    buttonText: "Contact Us",
    pngImage:
      "https://yoge-demo.pbminfotech.com/demo3/wp-content/uploads/sites/4/revslider/slider-demo-03/demo3-slider-1.png",
  },
  {
    id: 2,
    background:
      "https://cdn.pixabay.com/photo/2020/08/22/12/36/yoga-5508336_1280.png",
    title: "Find Your Inner Peace.",
    description: "Embrace the journey of self-discovery and mindfulness.",
    buttonText: "Join Now",
    pngImage:
      "https://yoge-demo.pbminfotech.com/demo3/wp-content/uploads/sites/4/revslider/slider-demo-03/demo3-slider-2.png",
  },
  // {
  //   id: 3,
  //   background:
  //     "https://cdn.pixabay.com/photo/2020/08/22/12/36/yoga-5508336_1280.png",
  //   title: "Find Your Inner Peace.",
  //   description: "Embrace the journey of self-discovery and mindfulness.",
  //   buttonText: "Join Now",
  //   pngImage:
  //     "https://show.moxcreative.com/aksa/wp-content/uploads/sites/40/2021/12/img_header_.png",
  // },
  // {
  //   id: 4,
  //   background:
  //     "https://cdn.pixabay.com/photo/2020/08/22/12/36/yoga-5508336_1280.png",
  //   title: "Find Your Inner Peace.",
  //   description: "Embrace the journey of self-discovery and mindfulness.",
  //   buttonText: "Join Now",
  //   pngImage:
  //     "https://templatekit.jegtheme.com/yogafit/wp-content/uploads/sites/367/2023/04/young-woman-practicing-WPDPPXV.png",
  // },
];
const HeroBanner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [smoothScrollY, setSmoothScrollY] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const smoothScrolling = () => {
      setSmoothScrollY((prev) => prev + (scrollY - prev) * 0.15);
      animationFrameId = requestAnimationFrame(smoothScrolling);
    };

    window.addEventListener("scroll", handleScroll);
    smoothScrolling();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <section className="relative w-full md:h-screen h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 h-full w-full bg-cover bg-center transition-transform duration-200"
              style={{
                backgroundImage: `url(${banner.background})`,
                transform: `translateY(${smoothScrollY * 0.2}px)`,
              }}
            >
              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black opacity-70"></div>

              {/* Left Content */}
              <div className="relative md:top-0 top-32 text-white text-center md:text-left max-w-lg z-10 px-4 md:px-0">
                <span className="uppercase tracking-wide text-sm font-semibold border border-white px-3 py-1 rounded-full">
                  Practice Positive Energy
                </span>
                <h1 className="text-3xl md:text-6xl font-bold mt-4">
                  {banner.title}
                </h1>
                <p className="mt-3 text-lg md:text-xl">{banner.description}</p>
                <button className="mt-6 bg-white text-black px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-gray-200 transition">
                  {banner.buttonText}
                </button>
              </div>

              {/* Right Image (Mobile Centered, Desktop Right-Aligned) */}
              <div
                className="relative w-[80%] md:w-[40%] md:flex hidden justify-center md:justify-end z-10 transition-transform duration-200"
                style={{
                  transform: `translateY(${smoothScrollY * 0.1}px)`,
                }}
              >
                <img
                  src={banner.pngImage}
                  alt="Yoga Pose"
                  className="w-full h-auto object-cover drop-shadow-lg"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
