import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/AssetComponent/Navbar";
import Footer from "./components/AssetComponent/Footer";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDasboard from "./pages/AdminDasboard";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Meditation from "./pages/Meditation";
// import Songs from "./pages/Songs";
// import Nutrition from "./pages/Nutrition";
// import YogaExercise from "./pages/YogaExercise";

const App = () => {
  return (
    <div className="mx-auto w-full">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin-dashBoard" element={<AdminDasboard />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/yoga-exercise" element={<YogaExercise />} /> */}
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contact />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="verify-email"
          element={
            <>
              <VerifyEmail />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
