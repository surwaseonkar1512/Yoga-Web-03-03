import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
} from "../../../services/operations/Recipe";
import { FaTrash } from "react-icons/fa";

const RecipeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      ingredients: [{ name: "", quantity: "" }],
    },
  });

  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const name = watch("title");
  const [recipes, setRecipes] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (name) {
      const randomString = Math.random().toString(36).substring(2, 8);
      const generatedSlug =
        name.toLowerCase().replace(/\s+/g, "-") + "-" + randomString;
      setValue("slug", generatedSlug);
    }
  }, [name, setValue]);

  const fetchRecipes = async () => {
    try {
      const response = await getRecipes();
      if (response) {
        setRecipes(response?.data);
        console.log("response?.data", response?.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Failed to fetch recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  const handleDelete = async (recipeId) => {
    try {
      const response = await deleteRecipe(recipeId);
      if (response.success) {
        toast.success("Recipe deleted successfully!");
        fetchRecipes(); // Refresh the list after deletion
      } else {
        toast.error(response.message || "Failed to delete Recipe");
      }
    } catch (error) {
      console.error("Error deleting Recipe:", error);
      toast.error("Failed to delete Recipe");
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "tags") {
          formData.append(key, JSON.stringify(value.split(",")));
        } else if (key === "ingredients") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "instructions") {
          formData.append(key, JSON.stringify(value.split("\n")));
        } else {
          formData.append(key, value);
        }
      });

      // Handle image uploads
      if (image) formData.append("image", image);
      if (data.infoImage[0]) formData.append("infoImage", data.infoImage[0]);
      if (data.ingredientsImage[0])
        formData.append("ingredientsImage", data.ingredientsImage[0]);
      if (data.instructionsImage[0])
        formData.append("instructionsImage", data.instructionsImage[0]);

      const response = await createRecipe(formData);
      if (response?.success) {
        toast.success("Recipe Created Successfully");
        reset();
        fetchRecipes();
        setImage(null);
        setShowForm(false);
      } else {
        toast.error(response?.error || "Failed to create recipe");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recipe</h2>
        <button
          className="bg-green-800 text-white px-4 py-2 rounded-full text-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create +"}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <input type="hidden" {...register("slug")} />

          <div>
            <label>Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label>Banner Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Info Image</label>
            <input
              type="file"
              {...register("infoImage")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Ingredients Image</label>
            <input
              type="file"
              {...register("ingredientsImage")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Instructions Image</label>
            <input
              type="file"
              {...register("instructionsImage")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>YouTube Video URL</label>
            <input
              {...register("youtubeVideo")}
              placeholder="Paste YouTube link here"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              {...register("prep_time")}
              placeholder="Prep Time"
              className="p-2 border rounded"
            />
            <input
              {...register("cook_time")}
              placeholder="Cook Time"
              className="p-2 border rounded"
            />
            <input
              {...register("total_time")}
              placeholder="Total Time"
              className="p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("servings")}
              placeholder="Servings"
              className="p-2 border rounded"
            />
            <input
              {...register("difficulty")}
              placeholder="Difficulty"
              className="p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("calories")}
              placeholder="Calories"
              className="p-2 border rounded"
            />
            <input
              {...register("type")}
              placeholder="Type (e.g. Vegan, Dessert)"
              className="p-2 border rounded"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Ingredients</h3>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-2 p-4 border rounded-xl shadow-md bg-white"
              >
                <input
                  {...register(`ingredients.${index}.name`, { required: true })}
                  placeholder="Ingredient Name"
                  className="p-2 border rounded-lg"
                />
                <input
                  {...register(`ingredients.${index}.quantity`, {
                    required: true,
                  })}
                  placeholder="Quantity"
                  className="p-2 border rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ name: "", quantity: "", image: "" })}
              className="bg-green-800 text-white px-3 py-1 rounded-lg my-6"
            >
              Add Ingredient
            </button>
          </div>

          <div>
            <label>Instructions (one per line)</label>
            <textarea
              {...register("instructions", {
                required: "Instructions are required",
              })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <input
              {...register("tags")}
              placeholder="Tags (comma separated)"
              className="w-full p-2 border rounded"
            />
            <input
              {...register("author", { required: "Author is required" })}
              placeholder="Author Name"
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Recipe"}
          </button>
        </form>
      )}
      <div className="container mx-auto p-6">
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white shadow-md rounded-lg overflow-hidden relative"
              >
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <p className="text-gray-600">
                    {recipe.description || "No description available"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No recipes available</p>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
