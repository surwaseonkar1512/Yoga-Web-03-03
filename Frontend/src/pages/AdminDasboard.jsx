import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaList, FaAppleAlt, FaMusic } from "react-icons/fa";
import YogaCategoryMain from "../components/AdminDashBoard/YogaCategoryComponent/YogaCategoryMainComponent";
import NutritionMain from "../components/AdminDashBoard/NutritionComponent/NutritionMain";
import { GrYoga } from "react-icons/gr";
import { MdOutlineFoodBank } from "react-icons/md";

const menuItems = [
  {
    id: "category",
    Component: <YogaCategoryMain />,
    name: "Yoga Category",
    icon: FaList,
  },
  {
    id: "nutrition",
    Component: <NutritionMain />,
    name: "Nutrition",
    icon: FaAppleAlt,
  },
  {
    id: "yoga",
    Component: <YogaCategoryMain />,
    name: "Yoga",
    icon: GrYoga,
  },
  {
    id: "nutrition recipe",
    Component: <YogaCategoryMain />,
    name: "Recipe",
    icon: MdOutlineFoodBank,
  },
];

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]); // Default selected menu
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { accountType } = useSelector((state) => state.auth);
  console.log("token", token);
  console.log("accountType", accountType);
  useEffect(() => {
    if (user === undefined) return; // Wait until user data is loaded

    setLoading(false); // Stop loading when user data is available

    if (!token) {
      navigate("/login");
    } else if (accountType !== "Admin") {
      console.log("accountType", accountType);
      // navigate("/profile");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 pt-28">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
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
        <main className="overflow-y-auto p-6">{selectedMenu?.Component}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
