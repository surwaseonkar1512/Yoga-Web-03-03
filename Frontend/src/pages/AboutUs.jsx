
const AboutUs = () => {
  return (
    <section className="relative flex flex-col-reverse bg-black md:flex-row items-center justify-between p-1 md:p-16 shadow-lg overflow-hidden mt-14">
      {/* Background Shape */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-purple-700 to-pink-500 z-0"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 10%, 50% 50%, 0 100%)" }}
      ></div>

      {/* Left Side - Image */}
      <div className="relative w-full md:w-1/2 flex justify-center z-10">
        <div className="relative w-[80%] md:w-[90%]">
          <img
            src="https://anahata.qodeinteractive.com/wp-content/uploads/2016/12/h1-img-4.png"
            alt="About Us"
            className="w-full h-[500px] rounded-md object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right Side - About Content */}
      <div className="relative w-full md:w-1/2 text-white text-center md:text-left mt-8 md:mt-0 px-4 z-10">
        <span className="px-4 py-2 text-green-800 bg-white font-semibold rounded-full uppercase">
          About Us
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
          Who We Are
        </h2>
        <p className="text-lg mt-4 text-white/90">
          We are a passionate team dedicated to delivering high-quality services
          and innovative solutions. Our mission is to bring creativity and
          excellence to everything we do.
        </p>
        <p className="text-lg mt-4 text-white/90">
          With years of experience and a commitment to our values, we strive to
          make a meaningful impact in our industry and for our clients.
        </p>

        {/* Yogahar Project Section */}
        <h3 className="text-2xl font-bold mt-6">Our Yogahar Initiative</h3>
        <p className="text-lg mt-4 text-white/90">
          Yogahar is our dedicated platform promoting health and wellness
          through yoga. We provide personalized yoga sessions and mindfulness
          techniques to enhance your well-being.
        </p>
        <p className="text-lg mt-4 text-white/90">
          Our certified trainers and holistic approach ensure that every
          individual finds balance, relaxation, and inner peace through our
          structured programs.
        </p>
        <p className="text-lg mt-4 text-white/90">
          We offer a variety of yoga styles, including Hatha, Vinyasa, and
          Ashtanga, tailored to different experience levels. Whether you are a
          beginner or an advanced practitioner, we have a program for you.
        </p>
        <p className="text-lg mt-4 text-white/90">
          In addition to yoga, we emphasize meditation, breathwork (Pranayama),
          and Ayurvedic lifestyle tips to help individuals achieve a harmonious
          mind-body connection.
        </p>
        <p className="text-lg mt-4 text-white/90">
          Join our community-driven workshops and retreats to experience yoga in
          a serene and supportive environment, fostering personal growth and
          self-discovery.
        </p>

        {/* Call to Action Button */}
        <button className="mt-6 bg-green-800 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition-all transform hover:scale-105">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
