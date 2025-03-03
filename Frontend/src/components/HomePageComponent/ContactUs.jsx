import React from "react";

const ContactUs = () => {
  return (
    <section
      className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg"
      //   style={{
      //     backgroundImage: `url("https://img.freepik.com/free-vector/modern-abstract-white-minimal-background_84443-8318.jpg?uid=R164463322&ga=GA1.1.1025254158.1735661044&semt=ais_hybrid")`,
      //   }}
    >
      {/* Left Side - Image */}
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="relative w-[80%] md:w-[90%]">
          <img
            src="https://yoge-demo.pbminfotech.com/demo1/wp-content/uploads/sites/2/2023/09/img-01.png"
            alt="Contact Us"
            className="w-full h-[500px] rounded-md object-contain"
          />
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full md:w-1/2 text-white md:text-black text-center md:text-left mt-8 md:mt-0 px-4">
        <h3 className="text-[#F98E78] font-semibold text-sm uppercase">
          Contact Us
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Get in Touch With Us
        </h2>
        <p className="text-lg mt-4 text-gray-600">
          Have any questions or want to book a session? Fill out the form below
          and we’ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F98E78]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F98E78]"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F98E78]"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#F98E78] text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-[#E67562] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
