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

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/profile/get-user-details`,
        {
          userId: user?._id, // Ensure the userId is passed correctly
        }
      );

      dispatch(setUser(data.data)); // Update Redux state

      if (data.data.additionalDetails) {
        setProfile({
          gender: data.data.additionalDetails.gender || "",
          dateOfBirth: data.data.additionalDetails.dateOfBirth || "",
          about: data.data.additionalDetails.about || "",
          contactNumber: data.data.additionalDetails.contactNumber || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
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
        `http://localhost:5000/api/profile/update-profile`,
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
        "http://localhost:5000/api/profile/update-display-picture",
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 mt-16">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={user?.image || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border shadow-md"
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
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-6 py-3 rounded-lg shadow-lg transition-all w-full`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
