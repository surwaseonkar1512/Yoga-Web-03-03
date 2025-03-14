import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";
import { AiOutlineCamera } from "react-icons/ai";
import { motion } from "framer-motion";
import { removeRecipe, removeYoga } from "../services/operations/Profile";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const [profile, setProfile] = useState({
    gender: "",
    dateOfBirth: "",
    about: "",
    contactNumber: "",
  });

  const [yogaSessions, setYogaSessions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [general, setGeneral] = useState({ title: "", content: "" });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.post(
        `https://yoga-web-03-03.onrender.com/api/profile/get-user-details`,
        {
          userId: user?._id,
        }
      );

      dispatch(setUser(data.data));

      if (data.data.additionalDetails) {
        setProfile({
          gender: data.data.additionalDetails.gender || "",
          dateOfBirth: data.data.additionalDetails.dateOfBirth || "",
          about: data.data.additionalDetails.about || "",
          contactNumber: data.data.additionalDetails.contactNumber || "",
          general: data.data.additionalDetails.generals || "",
          savedYoga: data.data.additionalDetails.savedYogaPoses || "",
          savedRecipe: data.data.additionalDetails.savedRecipes || "",
        });
        setYogaSessions(data.data.additionalDetails.savedYogaPoses);
        setRecipes(data.data.additionalDetails.savedRecipes);
        setGeneral(data.data.additionalDetails.generals);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleGeneralChange = (e) => {
    setGeneral({ ...general, [e.target.name]: e.target.value });
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();

    if (!general.title || !general.content) {
      setMessage("User ID, title, and content are required.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://yoga-web-03-03.onrender.com/api/profile/add-general",
        {
          userId: user._id,
          title: general.title,
          content: general.content,
        }
      );

      setMessage("General content added successfully!");
      setGeneral({ title: "", content: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error adding general content."
      );
    }
  };
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data } = await axios.put(
        `https://yoga-web-03-03.onrender.com/api/profile/update-profile`,
        {
          userId: user._id,
          ...profile,
        }
      );

      dispatch(setUser(data.updatedUserDetails)); // Update Redux state
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating profile.");
    }

    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        setMessage("Authentication failed. Please log in again.");
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("displayPicture", file);
      formData.append("userId", user._id);

      const { data } = await axios.put(
        "https://yoga-web-03-03.onrender.com/api/profile/update-display-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );

      dispatch(setUser(data.data)); // Update Redux state
      setMessage("Profile picture updated successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error updating profile picture."
      );
    }

    setUploading(false);
  };

  const handleRemoveYoga = async (yogaId) => {
    if (!user || !user._id) {
      setError("User not found. Please log in.");
      return;
    }

    const response = await removeYoga({ userId: user._id, yogaPoseId: yogaId });

    if (response.success) {
      console.log("Yoga pose saved successfully!");
      fetchUserData();
    } else {
      setError(response.message || "Failed to save yoga pose.");
    }
  };
  const handleRemoveRecipe = async (recipeId) => {
    if (!user || !user._id) {
      setError("User not found. Please log in.");
      return;
    }

    const response = await removeRecipe({
      userId: user._id,
      recipeId: recipeId,
    });

    if (response.success) {
      console.log("recipe  saved successfully!");
      fetchUserData();
    } else {
      setError(response.message || "Failed to save recipe .");
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto p-6 bg-white rounded-xl border border-gray-200 mt-20">
      <div className="relative flex justify-center items-center min-h-screen ">
        {/* Blurred Background */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500   blur-xl"></div> */}

        {/* 3D Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 3, rotateY: 3 }}
          className="relative mx-auto p-6 backdrop-blur-lg bg-white bg-opacity-10 rounded-xl shadow-2xl md:grid md:grid-cols-2 gap-8 z-10 border border-gray-200"
        >
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-500 opacity-20 rounded-xl"></div> */}

          {/* Profile Image Section */}
          <div className="flex flex-col items-center z-10">
            <div className="relative w-full h-full">
              <img
                src={user?.image || "/default-avatar.png"}
                alt="Profile"
                className="object-cover w-full h-full  border-4 border-green-500 shadow-md"
              />
              <label className="absolute bottom-2 right-2 bg-green-800 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer shadow-md transition">
                <AiOutlineCamera className="text-3xl" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {/* <h2 className="text-xl font-semibold mt-4 text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-300">{user?.email}</p> */}
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-6 rounded-lg shadow-md z-10"
          >
            <div className="space-y-4">
              <input
                name="firstName"
                value={user?.firstName || ""}
                placeholder="First Name"
                className="border p-3 rounded-lg shadow-sm w-full bg-gray-200 cursor-not-allowed"
                disabled
              />
              <input
                name="lastName"
                value={user?.lastName || ""}
                placeholder="Last Name"
                className="border p-3 rounded-lg shadow-sm w-full bg-gray-200 cursor-not-allowed"
                disabled
              />
              <input
                name="email"
                value={user?.email || ""}
                placeholder="Email"
                className="border p-3 rounded-lg shadow-sm w-full bg-gray-200 cursor-not-allowed"
                disabled
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  placeholder="Gender"
                  className="border p-3 rounded-lg shadow-sm w-full focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  className="border p-3 rounded-lg shadow-sm w-full focus:ring-2 focus:ring-green-500"
                />
              </div>

              <textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                placeholder="About"
                className="border p-3 rounded-lg shadow-sm w-full focus:ring-2 focus:ring-green-500"
              />

              <input
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                className="border p-3 rounded-lg shadow-sm w-full focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-green-800 hover:bg-green-700"
                } text-white px-6 py-3 rounded-lg shadow-lg transition-all w-full`}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Saved Yoga Sessions */}
      <div className="w-full  mt-6">
        <h3 className="text-xl font-semibold">Saved Yoga Sessions</h3>
        {yogaSessions.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {yogaSessions.map((pose) => (
              <div
                key={pose._id}
                className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={pose.mainImage}
                    alt={pose.name}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-green-800 text-white px-3 py-1 text-sm rounded-lg shadow">
                    {pose.totalTimeToPractice} min
                  </div>

                  <div
                    onClick={() => {
                      handleRemoveYoga(pose._id);
                    }}
                    className="absolute top-2 right-2 bg-green-800 text-white px-3 py-1 text-sm rounded-lg shadow"
                  >
                    Remove
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pose.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-3 mb-5">
                    {pose.mainParagraph}
                  </p>

                  {/* Button Section */}
                  <Link
                    to={`/yogaDetailPage/${pose.slug}`}
                    className="mt-auto my-4 block text-center bg-green-800 hover:bg-green-800 text-white font-semibold py-2 rounded-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No saved yoga sessions.</p>
        )}
      </div>

      {/* Saved Recipes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Saved Recipes</h3>
        {recipes.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recipes.map((recipe) => (
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
                    handleRemoveRecipe(recipe._id);
                  }}
                  className=" cursor-pointer absolute top-2 right-2 bg-green-800 text-white px-3 py-1 text-sm rounded-lg shadow"
                >
                  Remove
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
          </ul>
        ) : (
          <p className="text-gray-500">No saved recipes.</p>
        )}
      </div>

      {/* Add General Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
        {/* General Content List */}
        <div className="relative p-6 backdrop-blur-lg bg-white bg-opacity-10 rounded-xl shadow-2xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-white">General Content</h3>

          {general?.length > 0 ? (
            <motion.ul
              className="mt-4 space-y-5"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {general.map((item) => (
                <motion.li
                  key={item._id}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 8px 20px rgba(255, 255, 255, 0.2)",
                  }}
                  className="p-5 bg-gray-200 bg-opacity-80 rounded-lg shadow-lg transition-transform duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 mt-2">{item.content}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-gray-300 mt-2">No general content available.</p>
          )}
        </div>

        {/* Add General Content Form */}
        <motion.div
          className="relative p-6 backdrop-blur-lg bg-white bg-opacity-10 rounded-xl shadow-2xl border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-white">
            Add General Content
          </h3>
          <form onSubmit={handleGeneralSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="title"
              value={general.title}
              onChange={handleGeneralChange}
              placeholder="Title"
              className="border p-3 rounded-lg shadow-sm w-full bg-gray-300 bg-opacity-80 focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              name="content"
              value={general.content}
              onChange={handleGeneralChange}
              placeholder="Content"
              className="border p-3 rounded-lg shadow-sm w-full bg-gray-300 bg-opacity-80 focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all w-full"
            >
              Add Content
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
