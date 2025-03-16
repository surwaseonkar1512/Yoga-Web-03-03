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
      benefits: [{ BenefitName: "", title: "", description: "" }],
      category: "",
      name: "",
      slug: "",
    },
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [infoImagePreview, setInfoImagePreview] = useState(null);
  const [infoImageFile, setInfoImageFile] = useState(null);
  const [benefitImagePreview, setBenefitImagePreview] = useState(null);
  const [benefitImageFile, setBenefitImageFile] = useState(null);
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
      const formData = new FormData();
      
      formData.append("category", data.category);
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("subHeading", data.subHeading);
      formData.append("mainParagraph", data.mainParagraph);
      formData.append("totalTimeToPractice", data.totalTimeToPractice);
      formData.append("totalRepetitions", data.totalRepetitions);
      formData.append("videoLink", data.videoLink);
  
      // Convert JSON data before appending
      formData.append("steps", JSON.stringify(data.steps));
      formData.append("benefits", JSON.stringify(data.benefits));
  
      // Append image files correctly
      if (imageFile) formData.append("mainImage", imageFile);
      if (infoImageFile) formData.append("infoSectionImage", infoImageFile);
      if (benefitImageFile) formData.append("benefitImage", benefitImageFile);
  
      const response = await createYogaPractices(formData);
  
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
        <form onSubmit={handleSubmit(onSubmit)} className="py-16 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
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

            {/* Name & Slug (Hidden) */}
            <input
              {...register("name")}
              type="text"
              placeholder="Yoga Name"
              className="w-full p-2 border rounded-lg"
              required
            />
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
            {/* <input
              {...register("infoSectionImage")}
              type="text"
              placeholder="Add infoSectionImage Link"
              className="w-full p-2 border rounded-lg"
              required
            /> */}

            {/* Video Link */}
            <input
              {...register("videoLink")}
              type="text"
              placeholder="YouTube Video Link"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
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
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Upload Info Image
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setInfoImageFile(file);
                  setInfoImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full p-2 border rounded-lg"
              required
            />
            {infoImagePreview && (
              <img
                src={infoImagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Upload Benefit Image
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setBenefitImageFile(file);
                  setBenefitImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full p-2 border rounded-lg"
              required
            />
            {benefitImagePreview && (
              <img
                src={benefitImagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          {/* Right Column */}
          <div className=" w-full ">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Steps Section */}
              <div className="rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800">Steps</h3>
                {stepFields.map((step, index) => (
                  <div
                    key={step.id}
                    className=" flex flex-col gap-2 p-4 border rounded-xl shadow-md bg-white"
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
                    <div className="flex flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          appendStep({
                            stepName: "",
                            title: "",
                            description: "",
                            image: "",
                          })
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition-all mt-3 my-2"
                      >
                        Add step
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition-all "
                      >
                        Remove Step
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800">Benefit</h3>
                {benefitFields.map((Benefit, index) => (
                  <div
                    key={Benefit.id}
                    className=" flex flex-col gap-2 p-4 border rounded-xl shadow-md bg-white"
                  >
                    <input
                      {...register(`benefits.${index}.BenefitName`)}
                      type="text"
                      placeholder="Benefit Name"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <input
                      {...register(`benefits.${index}.title`)}
                      type="text"
                      placeholder="Title"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <textarea
                      {...register(`benefits.${index}.description`)}
                      placeholder="Description"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <div className="flex flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          appendBenefit({
                            BenefitName: "",
                            title: "",
                            description: "",
                          })
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition-all mt-3 my-2"
                      >
                        Add Benefit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition-all "
                      >
                        Remove Benefit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Image Upload */}
            </div>

            {/* Submit Button (Full Width) */}
            <div className="">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
              >
                Create Yoga Pose
              </button>
            </div>
          </div>
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
                <div className="text-lg font-semibold text-gray-800">
                  <div>
                    <span className="text-green-800">Category:</span>{" "}
                    {yoga?.category?.name}
                  </div>
                </div>
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
