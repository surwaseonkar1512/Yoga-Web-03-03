import React, { useState, useEffect } from "react";
import { getCategories } from "../services/operations/YogaCategory";
import {
  getYogaByCategory,
  getYogaPractice,
} from "../services/operations/YogaPractices";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveYoga } from "../services/operations/Profile";
import { MdBookmarkAdd } from "react-icons/md";
import toast from "react-hot-toast";

const YogaCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [yogaPoses, setYogaPoses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.[0]?._id
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.profile);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories();
        if (response.success) {
          setCategories(response.data);
          if (response.data.length > 0) {
            setSelectedCategory(response.data[0]._id);
          }
        } else {
          setError("Error fetching categories");
        }
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch yoga poses when selectedCategory changes
  // Fetch yoga poses when selectedCategory changes
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchYogaByCategory = async () => {
      setLoading(true);
      try {
        const response = await getYogaPractice();
        if (response.success) {
          // Filter yoga poses based on selectedCategory ID
          const filteredPoses = response.data.filter(
            (pose) => pose.category?._id === selectedCategory
          );
          setYogaPoses(filteredPoses);
        } else {
          setError("Error fetching yoga poses");
        }
      } catch (err) {
        setError("Failed to load yoga poses");
      } finally {
        setLoading(false);
      }
    };

    fetchYogaByCategory();
  }, [selectedCategory]);

  const handleSaveYoga = async (yogaId) => {
    if (!user || !user._id) {
      toast.error("User not found. Please log in.");
      return;
    }

    const response = await saveYoga({ userId: user._id, yogaPoseId: yogaId });

    if (response.success) {
      toast.success("Yoga pose saved successfully!");
    } else {
      setError(response.message || "Failed to save yoga pose.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4 mt-40">
        {/* Category Skeleton */}
        <div className="w-48 h-10 bg-gray-300 rounded-lg animate-pulse"></div>

        {/* Yoga Poses Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-lg bg-white animate-pulse"
            >
              <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
              <div className="h-6 bg-gray-300 rounded mt-4 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mt-2 w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded mt-2 w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="mx-auto p-6 mt-24">
      <div className="text-center mb-8 md:mb-12">
        <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
          Yoga Categories
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Balance, Breathe, Thrive!
        </h2>
      </div>
      {/* Category Scroller */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`flex flex-col items-center p-3 border rounded-lg shadow-md transition-all min-w-[150px] sm:min-w-[200px] ${
                selectedCategory === category._id
                  ? "bg-green-800 text-white"
                  : "bg-gray-100"
              }`}
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[150px] object-cover"
                />
              )}
              <span className="mt-2 font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Yoga Poses Section */}
      <div className="mt-6">
        {/* Yoga Poses Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-start text-gray-800">
            Yoga Poses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading
              ? [...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-lg shadow-lg bg-white animate-pulse"
                  >
                    <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
                    <div className="h-6 bg-gray-300 rounded mt-4 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded mt-2 w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded mt-2 w-2/3"></div>
                  </div>
                ))
              : yogaPoses.length > 0
              ? yogaPoses.map((pose) => (
                  <div
                    key={pose._id}
                    className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Image Section */}
                    <div className="relative">
                      <img
                        src={pose.mainImage}
                        alt={pose.name}
                        className="w-full h-56 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-800 text-white px-3 py-1 text-sm rounded-lg shadow">
                        {pose.totalTimeToPractice} min
                      </div>
                      <div
                        onClick={() => {
                          handleSaveYoga(pose._id);
                        }}
                        className=" cursor-pointer absolute top-2 right-2 bg-green-800 text-white px-3 py-1 text-sm rounded-lg shadow"
                      >
                        <MdBookmarkAdd size={20} />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col mt-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {pose.name}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-3 mb-5">
                        {pose.mainParagraph}
                      </p>

                      {/* Button Section */}
                      <Link
                        to={`/yogaDetailPage/${pose.slug}`}
                        className="mt-auto my-4 block text-center bg-green-800 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              : !loading && (
                  <p className="text-center text-gray-500 col-span-3">
                    No poses found for this category.
                  </p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaCategoryPage;
