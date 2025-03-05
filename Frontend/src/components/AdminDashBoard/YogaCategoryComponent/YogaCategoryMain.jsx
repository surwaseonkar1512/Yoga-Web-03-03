import React, { useState, useEffect } from "react";
import axios from "axios";

const YogaCategoryMain = () => {
  const [categories, setCategories] = useState([]);
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

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://yoga-web-03-03.onrender.com/api/categories/getCategory"
        );
        if (response.data && response.data.success) {
          setCategories(response?.data?.data);
        } else {
          setError("Invalid data format from API");
        }
      } catch (err) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.slug ||
      !formData.image ||
      !formData.heading ||
      !formData.paragraph
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setError(null);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("image", formData.image);
      data.append("heading", formData.heading);
      data.append("paragraph", formData.paragraph);

      const response = await axios.post(
        "https://yoga-web-03-03.onrender.com/api/categories/yogaCategory",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data && response.data.success) {
        setCategories([...categories, response.data.data]);
        setShowForm(false);
        setFormData({
          name: "",
          slug: "",
          image: null,
          heading: "",
          paragraph: "",
        });
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      setError("Error creating category.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Yoga Categories</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg"
          onClick={() => setShowForm(!showForm)}
        >
          +
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
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
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

      {/* ✅ Display categories with createdAt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-bold mt-2">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(category.createdAt).toLocaleString()}{" "}
              {/* ✅ Format Date */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YogaCategoryMain;
