import React, { useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    countrycode: "+91",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitContactForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        formData
      );

      if (res?.data?.success) {
        setSuccess("Message sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phoneNo: "",
          countrycode: "+91",
          message: "",
        });
      } else {
        setError("Failed to send message. Try again later.");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col-reverse bg-black md:flex-row items-center justify-between p-1 md:p-16 shadow-lg overflow-hidden">
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
            alt="Contact Us"
            className="w-full h-[500px] rounded-md object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="relative w-full md:w-1/2 text-white text-center md:text-left mt-8 md:mt-0 px-4 z-10">
        <span className="px-4 py-2 text-green-800 bg-white font-semibold rounded-full uppercase">
          Contact Us
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
          Get in Touch With Us
        </h2>
        <p className="text-lg mt-4 text-white/90">
          Have any questions or want to book a session? Fill out the form below,
          and we’ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={submitContactForm}
          className="mt-6 space-y-4 bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg"
        >
          <div className="flex gap-4">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-1/2 p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-1/2 p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="countrycode"
              value={formData.countrycode}
              onChange={handleChange}
              placeholder="Country Code (+91, +1, etc.)"
              required
              className="hidden w-1/3 p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
            />
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
            />
          </div>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full p-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC27A] text-gray-800 bg-white/80 placeholder-gray-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-800 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition-all transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Success & Error Messages */}
          {success && (
            <p className="text-green-400 font-medium text-sm mt-2">{success}</p>
          )}
          {error && (
            <p className="text-red-500 font-medium text-sm mt-2">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
