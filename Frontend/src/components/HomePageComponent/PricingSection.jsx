import React from "react";

const PricingSection = () => {
  return (
    <section
      className="relative text-white py-16 px-6 md:px-16"
      style={{
        backgroundColor: "#047857", // Tailwind green-800
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold">
            Save up to <span className="text-[#F98E78]">$1892</span> a Year
          </h2>
          <p className="text-lg mt-4">
            We understand the pain of paying too much for Shopify app fees. This
            theme can save you $1892 a year.
          </p>
        </div>

        {/* Right Side - Image & Table */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="https://ativo.vamtam.com/wp-content/uploads/2021/07/iStock-924163458.png"
            alt="Pricing Table"
            className="w-3/4 rounded-md shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
