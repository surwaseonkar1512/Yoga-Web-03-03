import { CheckCircle, Clock, Headset, Heart } from "lucide-react"; // Icons for features
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <CheckCircle size={24} className="text-green-500" />,
      text: "Certified Yoga Instructors",
    },
    {
      icon: <Clock size={24} className="text-blue-500" />,
      text: "Flexible Schedules",
    },
    {
      icon: <Headset size={24} className="text-purple-500" />,
      text: "Guided Meditation Support",
    },
    {
      icon: <Heart size={24} className="text-red-500" />,
      text: "Holistic Well-being Approach",
    },
  ];

  return (
    <section className="relative w-full h-auto bg-gradient-to-r from-purple-700 to-pink-500 text-black py-16 px-8 lg:px-20 flex flex-col md:flex-row items-center">
      <div
        className="absolute -inset-1 "
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)",
        }}
      ></div>
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="relative w-[80%] md:w-[90%]">
          <img
            src="https://ativo.vamtam.com/wp-content/uploads/2021/07/iStock-924163458.png"
            alt="Yoga Pose"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 text-white  text-center md:text-left mt-8 md:mt-0 px-4">
        <span className="px-4 py-2 bg-white text-green-900 font-semibold rounded-full">
          YOGA FLOW
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Dive Into Yoga Practice at Yogahar
        </h2>
        <p className="text-lg mt-4">
          Our mission is to make the practice of yoga accessible to everyone,
          regardless of age, ability, or experience level.
        </p>
        <p className="mt-2">
          We are committed to providing high-quality instruction, fostering
          community connections, and empowering individuals to embrace their
          authentic selves through yoga.
        </p>
        {/* Features Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {feature.icon}
              <p className="text-gray-800 font-semibold">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
