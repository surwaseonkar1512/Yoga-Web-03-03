import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";
import { AiOutlineCamera } from "react-icons/ai";

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
  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 mt-16">
      <div className="flex md:flex-row flex-col gap-3 items-start">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user?.image || "/default-avatar.png"}
              alt="Profile"
              className="w-[300px] h-[300px] object-cover rounded-full border shadow-md"
            />
            <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
              <AiOutlineCamera className="text-lg" />
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <h2 className="text-2xl font-semibold mt-4">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {message && (
          <p className="text-center text-sm font-semibold text-green-600 bg-green-100 p-2 rounded-lg mt-4">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            name="firstName"
            value={user?.firstName || ""}
            placeholder="First Name"
            className="border p-3 rounded-lg shadow-sm w-full bg-gray-100 cursor-not-allowed"
            disabled
          />
          <input
            name="lastName"
            value={user?.lastName || ""}
            placeholder="Last Name"
            className="border p-3 rounded-lg shadow-sm w-full bg-gray-100 cursor-not-allowed"
            disabled
          />
          <input
            name="email"
            value={user?.email || ""}
            placeholder="Email"
            className="border p-3 rounded-lg shadow-sm w-full bg-gray-100 cursor-not-allowed"
            disabled
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="border p-3 rounded-lg shadow-sm w-full"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
              className="border p-3 rounded-lg shadow-sm w-full"
            />
          </div>

          <textarea
            name="about"
            value={profile.about}
            onChange={handleChange}
            placeholder="About"
            className="border p-3 rounded-lg shadow-sm w-full"
          />

          <input
            name="contactNumber"
            value={profile.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="border p-3 rounded-lg shadow-sm w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white px-6 py-3 rounded-lg shadow-lg transition-all w-full`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* Saved Yoga Sessions */}
      <div className="w-full bg-gray-200 mt-6">
        <h3 className="text-xl font-semibold">Saved Yoga Sessions</h3>
        {yogaSessions.length > 0 ? (
          <ul className="list-disc pl-5">
            {yogaSessions.map((session) => (
              <li key={session._id} className="mt-2">
                {session.title}
              </li>
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
          <ul className="list-disc pl-5">
            {recipes.map((recipe) => (
              <li key={recipe._id} className="mt-2">
                {recipe.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No saved recipes.</p>
        )}
      </div>

      {/* Add General Content */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">General Content</h3>
        {general?.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {general.map((general) => (
              <li
                key={general._id}
                className="p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <h4 className="text-lg font-semibold">{general.title}</h4>
                <p className="text-gray-700">{general.content}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(general.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No general content available.</p>
        )}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Add General Content</h3>
        <form onSubmit={handleGeneralSubmit} className="space-y-4 mt-3">
          <input
            type="text"
            name="title"
            value={general.title}
            onChange={handleGeneralChange}
            placeholder="Title"
            className="border p-3 rounded-lg shadow-sm w-full"
            required
          />
          <textarea
            name="content"
            value={general.content}
            onChange={handleGeneralChange}
            placeholder="Content"
            className="border p-3 rounded-lg shadow-sm w-full"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all w-full"
          >
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
}
