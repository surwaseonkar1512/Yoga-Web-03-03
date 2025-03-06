import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import YogaList from "./YogaList";

const YogaForm = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      steps: [{ stepName: "", title: "", description: "", image: "" }],
      benefits: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("subHeading", data.subHeading);
    formData.append("mainParagraph", data.mainParagraph);
    formData.append("totalTimeToPractice", data.totalTimeToPractice);
    formData.append("totalRepetitions", data.totalRepetitions);
    formData.append("videoLink", data.videoLink);
    formData.append("steps", JSON.stringify(data.steps));
    formData.append("benefits", JSON.stringify(data.benefits));
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/yogas",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Yoga pose created successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating yoga pose:", error);
      alert("Failed to create yoga pose");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <YogaList />
      <h2 className="text-xl font-bold text-center mb-4">Create Yoga Pose</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("category")}
          type="text"
          placeholder="Category ID"
          className="w-full p-2 border rounded"
          required
        />

        {/* Name */}
        <input
          {...register("name")}
          type="text"
          placeholder="Yoga Name"
          className="w-full p-2 border rounded"
          required
        />

        {/* Slug */}
        <input
          {...register("slug")}
          type="text"
          placeholder="Slug (URL-friendly name)"
          className="w-full p-2 border rounded"
          required
        />

        {/* Subheading */}
        <input
          {...register("subHeading")}
          type="text"
          placeholder="Subheading"
          className="w-full p-2 border rounded"
          required
        />

        {/* Main Paragraph */}
        <textarea
          {...register("mainParagraph")}
          placeholder="Main Paragraph"
          className="w-full p-2 border rounded"
          required
        />

        {/* Total Time */}
        <input
          {...register("totalTimeToPractice")}
          type="text"
          placeholder="Total Time to Practice (e.g., 15 minutes)"
          className="w-full p-2 border rounded"
          required
        />

        {/* Total Repetitions */}
        <input
          {...register("totalRepetitions")}
          type="text"
          placeholder="Total Repetitions"
          className="w-full p-2 border rounded"
          required
        />

        {/* Video Link */}
        <input
          {...register("videoLink")}
          type="text"
          placeholder="YouTube Video Link"
          className="w-full p-2 border rounded"
          required
        />

        {/* Steps Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Steps</h3>
          {fields.map((step, index) => (
            <div key={step.id} className="p-4 border rounded">
              <input
                {...register(`steps.${index}.stepName`)}
                type="text"
                placeholder="Step Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                {...register(`steps.${index}.title`)}
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                {...register(`steps.${index}.description`)}
                placeholder="Description"
                className="w-full p-2 border rounded"
                required
              />
              <input
                {...register(`steps.${index}.image`)}
                type="text"
                placeholder="Image URL"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
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
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Step
          </button>
        </div>

        {/* Benefits Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Benefits</h3>
          {fields.map((_, index) => (
            <input
              key={index}
              {...register(`benefits.${index}`)}
              type="text"
              placeholder={`Benefit ${index + 1}`}
              className="w-full p-2 border rounded"
              required
            />
          ))}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Upload Main Image</h3>
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
            className="w-full p-2 border rounded"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Yoga Pose
        </button>
      </form>
    </div>
  );
};

export default YogaForm;
