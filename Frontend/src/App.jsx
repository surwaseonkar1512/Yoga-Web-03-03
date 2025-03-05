import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/HomePageComponent/Navbar";
import Footer from "./components/AssetComponent/Footer";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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
