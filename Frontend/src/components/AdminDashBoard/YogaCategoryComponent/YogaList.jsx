import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const YogaList = () => {
  const [yogas, setYogas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYogas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/yogas");
        setYogas(response.data.data);
      } catch (err) {
        setError("Failed to load yoga data");
      } finally {
        setLoading(false);
      }
    };
    fetchYogas();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Yoga Practices</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {yogas.map((yoga) => (
          <div
            key={yoga._id}
            className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white text-black transform hover:scale-105 transition duration-300"
          >
            <img
              src={yoga.mainImage}
              alt={yoga.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 left-4 bg-white px-3 py-1 text-sm font-bold rounded-full shadow-md">
              {yoga.name}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{yoga.subheading}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {yoga.mainParagraph}
              </p>
            </div>
            <Link
              to={`/yoga/${yoga._id}`}
              className="absolute bottom-4 right-4 bg-green-600 p-3 rounded-full shadow-md hover:bg-green-700 transition"
            >
              <FaArrowRight className="text-white" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YogaList;
