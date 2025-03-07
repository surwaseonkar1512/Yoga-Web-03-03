import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getCategories } from "../../../services/operations/YogaCategory";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import {
  createYogaPractices,
  deleteCategory,
  getYogaPractice,
} from "../../../services/operations/YogaPractices";
import toast from "react-hot-toast";

const YogaForm = () => {
  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: {
      steps: [{ stepName: "", title: "", description: "", image: "" }],
      benefits: [""],
      category: "",
      name: "",
      slug: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const name = watch("name");
  const [yogas, setYogas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Generate slug
  useEffect(() => {
    if (name) {
      const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
      const generatedSlug =
        name.toLowerCase().replace(/\s+/g, "-") + "-" + randomString;
      setValue("slug", generatedSlug); // Set the generated slug in form state
    }
  }, [name, setValue]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const fetchYogas = async () => {
    try {
      const response = await getYogaPractice();
      setYogas(response.data);
    } catch (err) {
      setError("Failed to load yoga data");
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await createYogaPractices({
        category: data.category,
        name: data.name,
        slug: data.slug,
        subHeading: data.subHeading,
        mainParagraph: data.mainParagraph,
        totalTimeToPractice: data.totalTimeToPractice,
        totalRepetitions: data.totalRepetitions,
        videoLink: data.videoLink,
        steps: JSON.stringify(data.steps),
        benefits: JSON.stringify(data.benefits),
        image: imageFile, // Pass the image file
      });

      if (response.success) {
        toast.success("Yoga pose created successfully!");
        reset();
        fetchYogas();
        setImagePreview(null);
      } else {
        toast.error(response.message || "Failed to create yoga pose");
      }
    } catch (error) {
      console.error("Error creating yoga pose:", error);
      toast.error("Failed to create yoga pose");
    }
  };
  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.success) {
        toast.success("Yoga practice deleted successfully!");
        fetchYogas(); // Refresh the list after deletion
      } else {
        toast.error(response.message || "Failed to delete yoga practice");
      }
    } catch (error) {
      console.error("Error deleting yoga practice:", error);
      toast.error("Failed to delete yoga practice");
    }
  };

  useEffect(() => {
    fetchYogas();
  }, []);
  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Yoga Practices</h2>
        <button
          className="bg-green-800 text-white px-4 py-2 rounded-full text-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create +"}
        </button>
      </div>
      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Select Category
            </label>
            <select
              {...register("category")}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <input
            {...register("name")}
            type="text"
            placeholder="Yoga Name"
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Hidden Slug Input */}
          <input {...register("slug")} type="hidden" />

          {/* Subheading */}
          <input
            {...register("subHeading")}
            type="text"
            placeholder="Subheading"
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Main Paragraph */}
          <textarea
            {...register("mainParagraph")}
            placeholder="Main Paragraph"
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Total Time & Repetitions */}
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("totalTimeToPractice")}
              type="text"
              placeholder="Total Time to Practice (e.g., 15 minutes)"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              {...register("totalRepetitions")}
              type="text"
              placeholder="Total Repetitions"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Video Link */}
          <input
            {...register("videoLink")}
            type="text"
            placeholder="YouTube Video Link"
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Steps Section */}
          <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Steps</h3>
            {fields.map((step, index) => (
              <div
                key={step.id}
                className="p-4 border rounded-xl shadow-md bg-white"
              >
                <input
                  {...register(`steps.${index}.stepName`)}
                  type="text"
                  placeholder="Step Name"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  {...register(`steps.${index}.title`)}
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <textarea
                  {...register(`steps.${index}.description`)}
                  placeholder="Description"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  {...register(`steps.${index}.image`)}
                  type="text"
                  placeholder="Image URL"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition-all"
                >
                  Remove Step
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({ stepName: "", title: "", description: "", image: "" })
              }
              className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
              Add Step
            </button>
          </div>

          {/* Image Upload */}
          <div className="space-y-2 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Upload Main Image
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full p-2 border rounded-lg"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Create Yoga Pose
          </button>
        </form>
      ) : null}
      <div>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {yogas.map((yoga) => (
            <div
              key={yoga._id}
              className="relative w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg bg-white text-black transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image Section */}
              <img
                src={yoga.mainImage}
                alt={yoga.name}
                className="w-full h-64 object-cover rounded-t-xl"
              />

              {/* Yoga Name Badge */}
              <div className="absolute top-4 left-4 bg-white px-4 py-1 text-sm font-bold rounded-full shadow-md">
                {yoga.name}
              </div>

              {/* Content Section */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {yoga.subheading}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {yoga.mainParagraph}
                </p>
              </div>

              {/* Buttons Section */}
              <div className="flex items-center justify-between p-4">
                {/* Delete Button with Icon */}
                <button
                  onClick={() => handleDelete(yoga._id)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all"
                >
                  <FaTrash />
                </button>

                {/* View Button with Arrow Icon
                <Link
                  to={`/yoga/${yoga._id}`}
                  className="bg-green-600 p-3 rounded-full shadow-md hover:bg-green-700 transition"
                >
                  <FaArrowRight className="text-white" />
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YogaForm;
