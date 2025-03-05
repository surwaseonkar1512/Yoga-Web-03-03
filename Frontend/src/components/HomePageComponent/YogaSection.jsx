import React from "react";

const YogaSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg">
      {/* Left Side - Image */}
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="relative w-[80%] md:w-[90%]">
          <img
            src="https://img.freepik.com/free-vector/silhouette-female-yoga-pose-against-mandala-design_1048-13082.jpg?t=st=1741158464~exp=1741162064~hmac=d47f2606cd49d1b98f8c8f6f5360ccb1f5d2ff526af4dac618591a48ef2b8507&w=900"
            alt="Yoga Pose"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>

      {/* Right Side - About Us Section */}
      <div className="w-full md:w-1/2 text-black text-center md:text-left mt-8 md:mt-0 px-4">
        <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
          About Us
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Embrace Your Wellness Journey
        </h2>
        <p className="text-lg mt-4 text-gray-700">
          At <span className="font-semibold text-[#F98E78]">Yoga Delight</span>,
          we provide a sanctuary where you can reconnect with yourself, improve
          flexibility, and find inner peace. Whether you're a beginner or an
          advanced practitioner, our diverse classes are designed to help you
          grow.
        </p>
        <p className="mt-2 text-gray-600">
          Our highly skilled instructors guide you through a transformative
          journey with personalized attention. We believe yoga is more than just
          movement—it’s a lifestyle.
        </p>

        {/* Key Features */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-[#F98E78] text-2xl">🧘‍♀️</span>
            <p className="text-gray-700">
              Wide range of classes for all skill levels.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#F98E78] text-2xl">🌿</span>
            <p className="text-gray-700">
              Peaceful & relaxing environment for deep practice.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#F98E78] text-2xl">👨‍🏫</span>
            <p className="text-gray-700">
              Experienced & certified yoga instructors.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#F98E78] text-2xl">💖</span>
            <p className="text-gray-700">
              A welcoming community that supports your growth.
            </p>
          </div>
        </div>

        {/* Call-to-Action Button */}
      </div>
    </section>
  );
};

export default YogaSection;
