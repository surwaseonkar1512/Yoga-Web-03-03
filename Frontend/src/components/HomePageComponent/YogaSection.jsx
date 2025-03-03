import React from "react";

const YogaSection = () => {
  return (
    <section
      className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg"
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/modern-abstract-white-minimal-background_84443-8318.jpg?uid=R164463322&ga=GA1.1.1025254158.1735661044&semt=ais_hybrid")`,
      }}
    >
      {/* Left Side - Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-[80%] md:w-[90%]  ">
            <img
              src="https://ativo.vamtam.com/wp-content/uploads/2021/07/iStock-924163458.png"
              alt="Yoga Pose"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 text-white md:text-black text-center md:text-left mt-8 md:mt-0 px-4">
        <h3 className="text-[#F98E78] font-semibold text-sm uppercase">
          About Yoga Delight
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Dive Into Yoga Practice at Our Studio
        </h2>
        <p className="text-lg mt-4">
          Our mission is to make the practice of yoga accessible to everyone,
          regardless of age, ability, or experience level.
        </p>
        <p className="mt-2 text-gray-600">
          We are committed to providing high-quality instruction, fostering
          community connections, and empowering individuals to embrace their
          authentic selves through yoga.
        </p>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 text-black">
          <div className="text-center">
            <span className="text-2xl font-bold">25k</span>
            <p className="text-sm text-gray-600">Students</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">100+</span>
            <p className="text-sm text-gray-600">Courses</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">50+</span>
            <p className="text-sm text-gray-600">Trainers</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">35k</span>
            <p className="text-sm text-gray-600">Reviews</p>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <button className="mt-6 bg-[#F98E78] text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-[#E67562] transition">
          Book Your Free Trial Lesson
        </button>
      </div>
    </section>
  );
};

export default YogaSection;
