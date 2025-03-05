import React, { useState, useEffect } from "react";
import axios from "axios";

const YogaCategoryMain = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
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
        const response = await axios.get("/api/categories"); // Replace with actual API URL
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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
      const response = await axios.post(
        "https://yoga-web-03-03.onrender.com/api/categories",
        formData
      ); // Replace with actual API URL

      if (response.data && response.data.id) {
        setCategories([...categories, response.data]); // Add new category to the list
        setShowForm(false);
        setFormData({
          name: "",
          slug: "",
          image: "",
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
    <div className=" p-4">
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
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
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

      {loading ? (
        <div className="text-center text-gray-500">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-500">No categories available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) =>
            category.id && category.name && category.image ? (
              <div key={category.id} className="border p-4 rounded-lg shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.heading}</p>
                <p className="text-sm">{category.paragraph}</p>
              </div>
            ) : (
              <div key={category.id || Math.random()} className="text-gray-500">
                Invalid category data
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default YogaCategoryMain;
