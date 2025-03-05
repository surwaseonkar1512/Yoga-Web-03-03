import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";

const recipes = [
  {
    title: "Avocado Toast",
    chef: "Healthy Chef",
    image:
      "https://media.istockphoto.com/id/1028328134/photo/avocado-toast.jpg?s=612x612&w=0&k=20&c=OGv1SFL5K8JVskq89njLnmE5lYBUJGj7SUBMj8vK4MQ=",
  },
  {
    title: "Berry Smoothie Bowl",
    chef: "Nutritionist Sarah",
    image:
      "https://media.istockphoto.com/id/1305291791/photo/mixed-berries-smoothie-bowl-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=qKBpDbUKEF3D_H48-cgItaG50brnYvQ_0JIU9gybQho=",
  },
  {
    title: "Quinoa Salad",
    chef: "Wellness Coach",
    image:
      "https://media.istockphoto.com/id/638197896/photo/healthy-organic-quinoa-tabouli-salad.jpg?s=612x612&w=0&k=20&c=gdkzYahN7rKnkXi8aGuS_Q0QaIOhixNu-UzGM5TZrAY=",
  },
  {
    title: "Avocado Toast",
    chef: "Healthy Chef",
    image:
      "https://media.istockphoto.com/id/1028328134/photo/avocado-toast.jpg?s=612x612&w=0&k=20&c=OGv1SFL5K8JVskq89njLnmE5lYBUJGj7SUBMj8vK4MQ=",
  },
  {
    title: "Berry Smoothie Bowl",
    chef: "Nutritionist Sarah",
    image:
      "https://media.istockphoto.com/id/1305291791/photo/mixed-berries-smoothie-bowl-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=qKBpDbUKEF3D_H48-cgItaG50brnYvQ_0JIU9gybQho=",
  },
  {
    title: "Quinoa Salad",
    chef: "Wellness Coach",
    image:
      "https://media.istockphoto.com/id/638197896/photo/healthy-organic-quinoa-tabouli-salad.jpg?s=612x612&w=0&k=20&c=gdkzYahN7rKnkXi8aGuS_Q0QaIOhixNu-UzGM5TZrAY=",
  },
  {
    title: "Avocado Toast",
    chef: "Healthy Chef",
    image:
      "https://media.istockphoto.com/id/1028328134/photo/avocado-toast.jpg?s=612x612&w=0&k=20&c=OGv1SFL5K8JVskq89njLnmE5lYBUJGj7SUBMj8vK4MQ=",
  },
  {
    title: "Berry Smoothie Bowl",
    chef: "Nutritionist Sarah",
    image:
      "https://media.istockphoto.com/id/1305291791/photo/mixed-berries-smoothie-bowl-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=qKBpDbUKEF3D_H48-cgItaG50brnYvQ_0JIU9gybQho=",
  },
  {
    title: "Quinoa Salad",
    chef: "Wellness Coach",
    image:
      "https://media.istockphoto.com/id/638197896/photo/healthy-organic-quinoa-tabouli-salad.jpg?s=612x612&w=0&k=20&c=gdkzYahN7rKnkXi8aGuS_Q0QaIOhixNu-UzGM5TZrAY=",
  },
  {
    title: "Avocado Toast",
    chef: "Healthy Chef",
    image:
      "https://media.istockphoto.com/id/1028328134/photo/avocado-toast.jpg?s=612x612&w=0&k=20&c=OGv1SFL5K8JVskq89njLnmE5lYBUJGj7SUBMj8vK4MQ=",
  },
  {
    title: "Berry Smoothie Bowl",
    chef: "Nutritionist Sarah",
    image:
      "https://media.istockphoto.com/id/1305291791/photo/mixed-berries-smoothie-bowl-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=qKBpDbUKEF3D_H48-cgItaG50brnYvQ_0JIU9gybQho=",
  },
  {
    title: "Quinoa Salad",
    chef: "Wellness Coach",
    image:
      "https://media.istockphoto.com/id/638197896/photo/healthy-organic-quinoa-tabouli-salad.jpg?s=612x612&w=0&k=20&c=gdkzYahN7rKnkXi8aGuS_Q0QaIOhixNu-UzGM5TZrAY=",
  },
];

const NutritionRecipesSection = () => {
  const swiperRef = useRef(null);

  return (
    <section className="relative md:py-16 py-7 bg-white text-white overflow-hidden">
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
            HEALTHY RECIPES
          </span>
          <h2 className="text-4xl font-bold mt-4">
            Discover Nutritious & Delicious Recipes
          </h2>
        </div>

        {/* Slider Section - Positioned in Front */}
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="relative w-full flex flex-col justify-end items-end z-10 col-span-3 gap-3 md:-right-8">
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
                1024: { slidesPerView: 2 },
              }}
              className="mt-8 w-full md:px-6 px-0"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {recipes.map((recipe, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white text-black">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-sm font-bold rounded-full">
                      {recipe.chef}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{recipe.title}</h3>
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
                  src="https://templatekit.tokomoo.com/healthfoodkit2/wp-content/uploads/sites/116/2023/01/how-it-works-image-02.png"
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
  );
};

export default NutritionRecipesSection;
