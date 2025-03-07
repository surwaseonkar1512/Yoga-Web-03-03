import React from "react";
import { motion } from "framer-motion";

const WellnessSection = () => {
  const items = [
    {
      title: "Meditation",
      description:
        "A practice that helps calm the mind, reduce stress, and enhance overall well-being.",
      image:
        "https://img.freepik.com/free-vector/asian-man-cartoon-practice-meditation_1308-146267.jpg?uid=R164463322&ga=GA1.1.1025254158.1735661044&semt=ais_hybrid",
    },
    {
      title: "Aromatherapy",
      description:
        "A healing technique using essential oils to promote relaxation and emotional balance.",
      image:
        "https://img.freepik.com/premium-vector/sports-fitness-yoga-3d-physical-culture-nutrition-sports-isolated-icons-objects-vegetables-with-girl-transparent-background_162862-1348.jpg?uid=R164463322&ga=GA1.1.1025254158.1735661044&semt=ais_hybrid",
    },
    {
      title: "Yoga Asanas",
      description:
        "Physical postures and exercises that improve flexibility, strength, and mental clarity.",
      image:
        "https://img.freepik.com/free-vector/girl-doing-yoga-cartoon-character_1308-118198.jpg?uid=R164463322&ga=GA1.1.1025254158.1735661044&semt=ais_hybrid",
    },
    {
      title: "Sound Therapy",
      description:
        "A method of healing that uses sound frequencies to reduce stress and enhance relaxation.",
      image:
        "https://img.freepik.com/premium-vector/boy-guy-young-man-sitting-cross-legged-meditating-listening-music-headphones_463755-168.jpg?uid=R164463322&ga=GA1.1.1025254158.1735661044&semt=ais_hybrid",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center">
        <motion.div
          className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-[200px] h-[200px] mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WellnessSection;
