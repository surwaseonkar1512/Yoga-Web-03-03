import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const blogPosts = [
  {
    title: "5 Yoga Poses to Start Your Morning Right",
    image:
      "https://theme.creativemox.com/zenyoga/wp-content/uploads/sites/39/2024/04/img_4.png",
    description:
      "Boost your energy and set a positive tone for the day with these simple yet powerful yoga poses.",
    link: "#",
  },
  {
    title: "The Power of Meditation in Yoga Practice",
    image:
      "https://theme.creativemox.com/zenyoga/wp-content/uploads/sites/39/2024/04/img_4.png",
    description:
      "Discover how meditation enhances flexibility, focus, and overall well-being in your yoga journey.",
    link: "#",
  },
  {
    title: "Yoga for Stress Relief: 3 Simple Techniques",
    image:
      "https://theme.creativemox.com/zenyoga/wp-content/uploads/sites/39/2024/04/img_4.png",
    description:
      "Feeling stressed? Try these three yoga techniques to calm your mind and body in just minutes.",
    link: "#",
  },
  {
    title: "The Best Yoga Poses for Better Sleep",
    image:
      "https://theme.creativemox.com/zenyoga/wp-content/uploads/sites/39/2024/04/img_4.png",
    description:
      "Struggling with sleep? These relaxing yoga poses can help you unwind and sleep better at night.",
    link: "#",
  },
  {
    title: "Yoga for Beginners: A Step-by-Step Guide",
    image:
      "https://theme.creativemox.com/zenyoga/wp-content/uploads/sites/39/2024/04/img_4.png",
    description:
      "New to yoga? Follow this beginner-friendly guide to start your journey with confidence.",
    link: "#",
  },
];

const BlogSlider = () => {
  return (
    <div className="w-full ">
      <h2 className="text-white text-4xl font-bold text-center mb-4">
        Latest Insights
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Stay updated with industry trends and tips.
      </p>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {blogPosts.map((post, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-contain"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                <a
                  href={post.link}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSlider;
