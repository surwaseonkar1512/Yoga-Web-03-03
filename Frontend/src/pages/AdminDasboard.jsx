import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaList,
  FaAppleAlt,
  FaMusic,
  FaSearch,
  FaCog,
  FaBell,
  FaUser,
} from "react-icons/fa";
import YogaCategoryMain from "../components/AdminDashBoard/YogaCategoryComponent/YogaCategoryMain";

const menuItems = [
  {
    id: "category",
    Component: <YogaCategoryMain />,
    name: "Category",
    icon: FaList,
  },
  {
    id: "nutrition",
    Component: <YogaCategoryMain />,
    name: "Nutrition",
    icon: FaAppleAlt,
  },
  {
    id: "music",
    Component: <YogaCategoryMain />,
    name: "Music",
    icon: FaMusic,
  },
];

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(menuItems?.[0]); // Default selected menu

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    } else if (user?.accountType !== "Admin") {
      navigate("/profile");
    }
  }, [user, navigate]);

  if (!user?.token || user?.accountType !== "Admin") {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 pt-28">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-6"> Dashboard</h1>
        <nav className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                  selectedMenu?.id === item.id ? "bg-green-700" : ""
                }`}
                onClick={() => setSelectedMenu(item)}
              >
                <Icon />
                <span>{item.name}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="relative w-1/3">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full border rounded"
            />
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600" />
            <FaCog className="text-gray-600" />
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="overflow-y-auto p-6">{selectedMenu?.Component}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
