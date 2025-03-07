import React, { useState, useEffect } from "react";

import { Trash2, TrendingUp } from "lucide-react";
import {
  createNutrition,
  deleteNutrition,
  getNutrition,
} from "../../../services/operations/NutritionCategroy";

const NutritionMain = () => {
  const [Nutrition, setNutrition] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: null,
    heading: "",
    paragraph: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Nutrition from API
  useEffect(() => {
    const fetchNutrition = async () => {
      setLoading(true);
      const response = await getNutrition();
      if (response.success) {
        setNutrition(response.data);
      } else {
        setError("Error fetching Nutrition");
      }
      setLoading(false);
    };
    fetchNutrition();
  }, []);

  // Function to generate slug from name
  const generateSlug = (name) => {
    const randomString = Math.random().toString(36).substring(2, 6); // Generate 4 random characters
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces & special chars with "-"
      .replace(/^-|-$/g, "") // Remove leading & trailing "-"
      .concat("-", randomString); // Append random string for uniqueness
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      slug: name === "name" ? generateSlug(value) : prev.slug, // Auto-generate slug
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !formData.name ||
      !formData.slug ||
      !formData.image ||
      !formData.heading ||
      !formData.paragraph
    ) {
      setError("All fields are required.");
      setLoading(false);

      return;
    }
    setError(null);

    const response = await createNutrition(formData);
    if (response.success) {
      setNutrition([...Nutrition, response.data]);
      setLoading(false);

      setShowForm(false);
      setFormData({
        name: "",
        slug: "",
        image: null,
        heading: "",
        paragraph: "",
      });
    } else {
      setError("Error creating category.");
      setLoading(false);
    }
  };

  // Handle delete category
  const handleDelete = async (categoryId) => {
    setLoading(true);
    const response = await deleteNutrition(categoryId);
    if (response.success) {
      setNutrition(Nutrition.filter((cat) => cat._id !== categoryId));
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div
      className={`  px-4  ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Yoga Nutrition</h2>
        <button
          className="bg-green-800 text-white px-4 py-2 rounded-full text-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create +"}
        </button>
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Create Category</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {/* Hidden Slug Input */}
            <input type="hidden" name="slug" value={formData.slug} />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="heading"
              placeholder="Heading"
              value={formData.heading}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="paragraph"
              placeholder="Paragraph"
              value={formData.paragraph}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Nutrition.map((category) => (
          <div
            key={category._id}
            className="relative border p-4 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
          >
            {/* Category Image */}
            <div className="relative w-full h-44">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Delete Button - Floating on Top Right */}
              <button
                onClick={() => handleDelete(category._id)}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Category Details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {category.description}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Created At: {new Date(category.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionMain;
