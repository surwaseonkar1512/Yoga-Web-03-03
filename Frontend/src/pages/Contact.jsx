import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { contactusEndpoint } from "../services/apis";

const Contact = () => {
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
    <div className="flex flex-col items-center justify-center">
      <section className="relative flex flex-col-reverse bg-black md:flex-row items-start justify-between p-1 md:p-16 shadow-lg overflow-hidden mt-14">
        <div
          className="absolute -inset-2 bg-gradient-to-r from-purple-700 to-pink-500 z-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 10%, 50% 50%, 0 100%)",
          }}
        ></div>

        <div className="relative w-full md:w-1/2 flex justify-start z-10">
          <div className="relative w-[80%] md:w-[90%]">
            <img
              src="https://wallpapers.com/images/hd/woman-performing-yoga-pose-gq6oj4pjlki8erru.jpg"
              alt="Contact Us"
              className="w-full md:h-[800px] h-[300px] rounded-md object-contain drop-shadow-lg"
            />
          </div>
        </div>

        <div className="relative w-full md:w-1/2 text-white text-center md:text-left mt-8 md:mt-0 px-4 z-10">
          <span className="px-4 py-2 text-green-800 bg-white font-semibold rounded-full uppercase">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
            Get in Touch With Us
          </h2>
          <p className="text-lg mt-4 text-white/90">
            Have any questions or want to book a session? Fill out the form
            below, and we’ll get back to you as soon as possible.
          </p>

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
                className="w-1/2 p-3 rounded-lg text-gray-800 bg-white/80 placeholder-gray-500"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-1/2 p-3 rounded-lg text-gray-800 bg-white/80 placeholder-gray-500"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg text-gray-800 bg-white/80 placeholder-gray-500"
            />
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full p-3 rounded-lg text-gray-800 bg-white/80 placeholder-gray-500"
            />
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg text-gray-800 bg-white/80 placeholder-gray-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-800 text-white px-6 py-3 rounded-full text-lg shadow-md transition-all hover:scale-105"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && (
              <p className="text-green-400 font-medium text-sm mt-2">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-500 font-medium text-sm mt-2">{error}</p>
            )}
          </form>

          <div className="mt-10 bg-white/20 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold">Our Office</h3>
            <p className="text-white/80">
              1810 Kings Way Marine Drive, 3rd Floor, Mumbai
            </p>
            <p className="text-white/80">Phone: 1800-2355-2356</p>
            <p className="text-white/80">Email: contact@Yogahar yoga.co</p>
          </div>
        </div>
      </section>

      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Google Map"
          className="w-full h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609841668!2d72.74109806966308!3d19.08219783948382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8a65c5a5b73%3A0x2a1947dd5fcb634d!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1633928038412!5m2!1sen!2sus"
          allowFullScreen="true"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
