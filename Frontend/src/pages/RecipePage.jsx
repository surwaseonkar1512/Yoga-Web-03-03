import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/operations/Recipe";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { saveRecipe } from "../services/operations/Profile";
import { useSelector } from "react-redux";
import { MdBookmarkAdd } from "react-icons/md";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await getRecipes();
      if (response) {
        setRecipes(response?.data);
        setFilteredRecipes(response?.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Failed to fetch recipes");
    } finally {
      setLoading(false);
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

  const handleSaveRecipe = async (recipeId) => {
    if (!user || !user._id) {
      toast.error("User not found. Please log in.");
      return;
    }

    const response = await saveRecipe({
      userId: user._id,
      recipeId: recipeId,
    });

    if (response) {
      toast.success("Recipe saved successfully!");
    } else {
      toast.error("Failed to save recipe.");
    }
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="text-center mb-8 md:mb-12">
        <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
          Delicious Recipes
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Savor the Flavor, Love Every Bite!
        </h2>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 shadow-sm focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/4 shadow-sm focus:ring-2 focus:ring-green-500"
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
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/4 shadow-sm focus:ring-2 focus:ring-green-500"
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
        {loading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-lg shadow-lg bg-gray-200 animate-pulse h-full"
                >
                  <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
                  <div className="h-6 w-3/4 bg-gray-400 rounded mt-4"></div>
                  <div className="h-4 w-1/2 bg-gray-400 rounded mt-2"></div>
                  <div className="h-10 bg-gray-400 rounded mt-4"></div>
                </div>
              ))
          : filteredRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="relative p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-green-800 text-white px-3 py-1 text-sm rounded-lg shadow">
                    {recipe.cook_time} min
                  </div>
                </div>
                <div
                  onClick={() => {
                    handleSaveRecipe(recipe._id);
                  }}
                  className="cursor-pointer absolute top-2 right-2 bg-green-800  text-white px-3 py-1 text-sm rounded-lg shadow"
                >
                  <MdBookmarkAdd size={20} />
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
                    className="mt-auto my-4 block text-center bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all"
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
