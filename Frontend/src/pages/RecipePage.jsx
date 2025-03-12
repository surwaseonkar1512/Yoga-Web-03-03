import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/operations/Recipe";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getRecipes();
      if (response) {
        setRecipes(response?.data);
        setFilteredRecipes(response?.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Failed to fetch recipes");
    }
  };

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, selectedTag, timeFilter]);

  const filterRecipes = () => {
    let updatedRecipes = recipes;

    if (searchTerm) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        recipe.tags.includes(selectedTag)
      );
    }

    if (timeFilter) {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => parseInt(recipe.cook_time) <= parseInt(timeFilter)
      );
    }

    setFilteredRecipes(updatedRecipes);
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Delicious Recipes
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 shadow-sm focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(recipes.flatMap((r) => r.tags))].map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="">Cooking Time</option>
          <option value="10">Up to 10 min</option>
          <option value="20">Up to 20 min</option>
          <option value="30">Up to 30 min</option>
        </select>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-56 object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 text-sm rounded-lg shadow">
                {recipe.cook_time} min
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {recipe.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm line-clamp-3 mb-5">
                {recipe.description}
              </p>

              {/* Button Section */}
              <Link
                to={`/recipeDetailPage/${recipe.slug}`}
                className="mt-auto my-4 block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
