import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getYogaPracticeBySlug } from "../services/operations/YogaPractices";

const YogaDetailsPage = () => {
  const { slug } = useParams(); // Get slug from URL
  const [yogaPose, setYogaPose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchYogaPose = async () => {
      try {
        const response = await getYogaPracticeBySlug(slug);
        if (response.success) {
          setYogaPose(response.data);
        } else {
          setError("Yoga pose not found");
        }
      } catch (err) {
        setError("Error fetching yoga pose details");
      } finally {
        setLoading(false);
      }
    };
    fetchYogaPose();
  }, [slug]);

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="w-full mx-auto">
      <div className="relative w-full md:h-[80vh] h-[50vh] flex items-center justify-center mt-20">
        <img
          src={yogaPose.mainImage}
          alt={yogaPose.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Text */}
        <h1 className="relative text-white md:text-4xl text-xl font-bold text-center px-4">
          {yogaPose.name}
        </h1>
      </div>

      {/* Yoga Pose Info */}

      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg">
        {/* Left Side - Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative w-[80%] md:w-[90%]">
            <img
              src={yogaPose.infoSectionImage}
              alt="Yoga Pose"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>

        {/* Right Side - About Us div */}
        <div className="w-full md:w-1/2 text-black text-center md:text-left mt-8 md:mt-0 px-4">
          <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
            {yogaPose.name}{" "}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            {yogaPose.subHeading}
          </h2>
          <p className="text-lg mt-4 text-gray-700">{yogaPose.mainParagraph}</p>

          {/* Key Features */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#F98E78] text-2xl">⏳</span>
              <p className="text-gray-700">
                <p className="text-lg">{yogaPose.totalTimeToPractice} mins</p>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#F98E78] text-2xl">🔄</span>
              <p className="text-gray-700">
                <p className="text-lg">{yogaPose.totalRepetitions} times</p>
              </p>
            </div>
          </div>

          {/* Call-to-Action Button */}
        </div>
      </div>

      {yogaPose.videoLink && (
        <div className="mt-8 w-full mx-auto px-6">
          <div className="w-full items-center justify-center flex my-5 ">
            <div className="relative md:text-3xl text-xl px-4 py-2 text-center bg-green-800 text-white font-semibold rounded-full z-10">
              Watch Video
            </div>
          </div>{" "}
          <div className="mt-4 flex justify-center">
            <iframe
              src={yogaPose.videoLink}
              title="Yoga Pose Video"
              frameBorder="0"
              allowFullScreen
              className="w-full md:h-[600px] h-full rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      )}
      {/* Step-by-Step Instructions */}
      <div className="relative w-full py-12 px-6 md:px-12 bg-white">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-500  z-0"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)" }}
        ></div>

        <div className="w-full items-center justify-center flex my-5 ">
          <div className="relative md:text-3xl text-lg px-4 py-2 text-center bg-green-800 text-white font-semibold rounded-full z-10">
            {yogaPose.name} Steps
          </div>
        </div>

        <div className="relative flex flex-col gap-12 z-10">
          {yogaPose?.steps?.map((step, index) => (
            <div
              key={step._id}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-lg w-full object-cover h-[400px] shadow-lg mix-blend-multiply"
                />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left px-4">
                <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
                  {step.stepName}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-lg mt-4 text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex flex-col gap-12 items-center justify-center z-10">
        <div className="relative md:text-3xl text-lg px-4 py-2 text-center bg-green-800 text-white font-semibold rounded-full z-10">
          Benefits of {yogaPose?.name}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <ul className="list-disc pl-5 space-y-4 md:mx-20 mx-4">
            {yogaPose?.benefits?.map((benefit) => (
              <li className="relative">
                <p className=" text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 select-none tracking-wider">
                  {benefit?.title}
                </p>
                <p key={benefit._id} className="text-lg text-gray-700">
                  <span className="font-semibold text-green-800">
                    {benefit.BenefitName}:
                  </span>
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="relative w-[80%] md:w-[90%] h-auto">
            <img
              src={yogaPose.benefitImage}
              alt="Yoga Pose"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaDetailsPage;
