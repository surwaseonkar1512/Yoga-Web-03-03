import React from "react";

const ContactUs = () => {
  return (
    <section className="relative flex flex-col-reverse bg-black md:flex-row items-center justify-between p-1 md:p-16 shadow-lg overflow-hidden">
      {/* Background Shape (Lower Z-index) */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-purple-700 to-pink-500 z-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 10%, 50% 50%, 0 100%)",
        }}
      ></div>

      {/* Left Side - Image */}
      <div className="relative w-full md:w-1/2 flex justify-center z-10 ">
        <div className="relative w-[80%] md:w-[90%]">
          <img
            src="https://anahata.qodeinteractive.com/wp-content/uploads/2016/12/h1-img-4.png"
            alt="Contact Us"
            className="w-full h-[500px] rounded-md object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="relative w-full md:w-1/2 text-white text-center md:text-left mt-8 md:mt-0 px-4 z-10 ">
        <h3 className="text-[#FFC27A] font-semibold text-sm uppercase tracking-widest">
          Contact Us
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
          Get in Touch With Us
        </h2>
        <p className="text-lg mt-4 text-white/90">
          Have any questions or want to book a session? Fill out the form below,
          and we’ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form className="mt-6 space-y-4 bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-800 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md  transition-all transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
