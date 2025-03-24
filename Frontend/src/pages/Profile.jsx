import { useState, useEffect } from "react";
import { MdDelete, MdOutlineBookmarkRemove } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";
import { AiOutlineCamera } from "react-icons/ai";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { IoIosRemoveCircle } from "react-icons/io";

import {
  addJournals,
  getUserData,
  removeGeneral,
  removeRecipe,
  removeYoga,
  updateDisplayPicture,
  updateUserProfile,
} from "../services/operations/Profile";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../slices/authSlice";

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
  const [addGeneral, setAddGeneral] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = ["Profile", "Yoga", "Recipes", "Journal"];
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("accountType");

    toast.success("Logged Out");

    // Redirect to home page
    navigate("/");
  };
  const fetchUserData = async () => {
    try {
      console.log("user._id,", user._id);
      const { data } = await getUserData({ userId: user._id });

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
      const { data } = await addJournals(user._id, general);

      setMessage("General content added successfully!");
      fetchUserData();
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
      const data = await updateUserProfile(user._id, profile);

      dispatch(setUser(data.updatedUserDetails)); // Update Redux state
      setMessage("Profile updated successfully!");
    } catch (errorMessage) {
      setMessage(errorMessage);
    }

    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication failed. Please log in again.");
        setUploading(false);
        return;
      }

      const data = await updateDisplayPicture(user._id, file, token);

      dispatch(setUser(data.data)); // Update Redux state
      setMessage("Profile picture updated successfully!");
    } catch (errorMessage) {
      setMessage(errorMessage);
    }

    setUploading(false);
  };

  const handleRemoveYoga = async (yogaId) => {
    try {
      if (!user || !user._id) {
        setMessage("User not found. Please log in.");
        return;
      }

      const response = await removeYoga({
        userId: user._id,
        yogaPoseId: yogaId,
      });

      if (response.success) {
        toast.success("Yoga pose removed successfully!");
        fetchUserData();
      } else {
        throw new Error(response.message || "Failed to remove yoga pose.");
      }
    } catch (error) {
      setMessage(error.message);
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
      toast.success("recipe remove successfully!");
      fetchUserData();
    } else {
      setError(response.message || "Failed to save recipe .");
    }
  };

  const removeGeneralEntry = async (generalId) => {
    try {
      const response = await removeGeneral(user._id, generalId);

      if (response.success) {
        // fetchUserData();
      } else {
        console.error("Failed to remove general content:", response.message);
      }
    } catch (error) {
      console.error("Error removing general content:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserData();
    }
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center mx-auto p-6 bg-white rounded-xl border border-gray-200 mt-20">
      <div className="w-full grid md:grid-cols-5 grid-cols-2 justify-around p-3 rounded-xl mb-6 gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 font-semibold rounded-lg transition-all duration-300 ${
              activeTab === tab
                ? "bg-green-800 text-white shadow-md"
                : "text-gray-600 border border-green-500 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button
          className={`px-6 py-2 font-semibold rounded-lg transition-all duration-300 ${
            logout
              ? "bg-green-800 text-white shadow-md"
              : "text-gray-600 border border-green-500 hover:bg-gray-200"
          }`}
          onClick={() => setLogout(true)}
        >
          Logout
        </button>
      </div>
      {activeTab === "Profile" && (
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
              <div className="relative w-full h-[550px]">
                <img
                  src={user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="object-cover w-full h-full  border-2 border-green-500 shadow-md"
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
      )}
      {/* Saved Yoga Sessions */}
      {activeTab === "Yoga" && (
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
                      className="absolute -top-2 right-2 bg-green-800 text-white px-1 py-1 text-sm rounded-lg shadow cursor-pointer"
                    >
                      <MdOutlineBookmarkRemove size={20} />
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
      )}
      {/* Saved Recipes */}
      {activeTab === "Recipes" && (
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
                    className="absolute -top-2 right-2 bg-green-800 text-white px-1 py-1 text-sm rounded-lg shadow cursor-pointer"
                  >
                    <MdOutlineBookmarkRemove size={20} />
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
      )}
      {logout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center"
          >
            {/* Modal Title */}
            <h2 className="text-xl font-semibold text-gray-900">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              {/* Cancel Button */}
              <button
                onClick={() => setLogout(false)} // Close modal
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout} // Call your logout function
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {activeTab === "Journal" && (
        <div className="grid grid-cols-1  w-full gap-3">
          {addGeneral ? (
            <motion.div
              className="relative p-6 backdrop-blur-lg bg-white bg-opacity-10 rounded-xl shadow-2xl border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-green-800 font-bold">
                  {" "}
                  Add Journal Entry
                </h2>
                <button
                  className="bg-green-800 text-white px-4 py-2 rounded-full text-lg"
                  onClick={() => setAddGeneral(!addGeneral)}
                >
                  {addGeneral ? "Cancel" : "Create +"}
                </button>
              </div>
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
                  className="md:w-[30%] bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all w-full"
                >
                  Add Journal Entry
                </button>
              </form>
            </motion.div>
          ) : null}
          {/* General Content List */}
          <div className="relative p-6 backdrop-blur-lg bg-white bg-opacity-10 rounded-xl shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-green-800 font-bold">
                {" "}
                Journal Entries
              </h2>
              <button
                className="bg-green-800 text-white px-4 py-2 rounded-full text-lg"
                onClick={() => setAddGeneral(!addGeneral)}
              >
                {addGeneral ? "Cancel" : "Create +"}
              </button>
            </div>

            {general?.length > 0 ? (
              <motion.ul
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {general.map((item) => (
                  <motion.li
                    key={item._id}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                    }}
                    className="relative p-5 bg-white rounded-xl shadow-lg transition-transform duration-300 border border-gray-300"
                  >
                    {/* Title */}
                    <h4 className="text-lg font-semibold text-gray-900 truncate">
                      {item.title}
                    </h4>

                    {/* Content */}
                    <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                      {item.content}
                    </p>

                    {/* Date */}
                    <p className="text-gray-500 text-xs mt-3">
                      {new Date(item.date).toLocaleDateString()}
                    </p>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeGeneralEntry(item._id)}
                      className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-2 shadow-md transition hover:bg-red-700"
                    >
                      <MdDelete size={18} />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <p className="text-gray-300 mt-2">
                No Journal content available.
              </p>
            )}
          </div>

          {/* Add General Content Form */}
        </div>
      )}
    </div>
  );
}
