import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeBySlug } from "../services/operations/Recipe";

const RecipeDetailPage = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeBySlug(slug);
        if (response.success) {
          setRecipe(response.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Failed to fetch recipe.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [slug]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe)
    return <p className="text-center text-gray-500">No recipe found.</p>;

  return (
    <div className="w-full mx-auto">
      <div className="relative w-full md:h-[80vh] h-[50vh] flex items-center justify-center mt-20">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Text */}
        <h1 className="relative text-white md:text-4xl text-xl font-bold text-center px-4">
          {recipe.title}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg">
        {/* Left Side - Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-HnTED-utemZAxYxIKpdX1h_Qx3_iASR8A&s"
            }
            alt={recipe.title}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-1/2 text-black text-center md:text-left mt-8 md:mt-0 px-4">
          <h1 className="w-fit px-4 py-2 my-2 md:text-xl text-lg text-center bg-green-800 text-white font-semibold rounded-full">
            {recipe.title}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-gray-700 text-lg">
            <p>
              <strong>Prep Time:</strong> {recipe.prep_time}
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cook_time}
            </p>
            <p>
              <strong>Total Time:</strong> {recipe.total_time}
            </p>
            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>
            <p>
              <strong>Difficulty:</strong> {recipe.difficulty}
            </p>
            <p>
              <strong>Calories:</strong> {recipe.calories}
            </p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {recipe.videoLink && (
        <div className="mt-8 w-full mx-auto px-6">
          <div className="w-full flex justify-center my-5">
            <div className="relative md:text-3xl text-xl px-4 py-2 text-center bg-green-800 text-white font-semibold rounded-full">
              Watch Video
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <iframe
              src={recipe.videoLink}
              title="Recipe Video"
              frameBorder="0"
              allowFullScreen
              className="w-full md:h-[600px] h-full rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      )}

      {/* Ingredients */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg">
        {/* Left Side - Image */}

        <div>
          <h2 className="w-fit px-4 py-2 my-2 md:text-xl text-lg text-center bg-green-800 text-white font-semibold rounded-full">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <strong>{ingredient.name}</strong>: {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-HnTED-utemZAxYxIKpdX1h_Qx3_iASR8A&s"
            }
            alt={recipe.title}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Instructions */}
      {/* Instructions */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-16 rounded-lg">
        <div className="relative w-full md:w-1/2 flex justify-center">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-HnTED-utemZAxYxIKpdX1h_Qx3_iASR8A&s"
            }
            alt={recipe.title}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="w-fit px-4 py-2 my-2 md:text-xl text-lg text-center bg-green-800 text-white font-semibold rounded-full">
            Instructions
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {recipe.instructions
              .join(", ") // Convert array into a single string
              .split(",") // Split the string at each comma
              .map((instruction, index) => (
                <li key={index} className="text-lg">
                  {instruction.trim()}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
