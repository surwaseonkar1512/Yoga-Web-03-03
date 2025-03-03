import React from "react";
import YogaSection from "./components/HomePageComponent/YogaSection";
import HeroBanner from "./components/HomePageComponent/HeroBanner";
import YogaServiceSection from "./components/HomePageComponent/YogaServiceSection";
import ContactUs from "./components/HomePageComponent/ContactUs";
import Footer from "./components/AssetComponent/Footer";
import Navbar from "./components/HomePageComponent/Navbar";

const App = () => {
  return (
    <div className=" mx-auto w-full">
      <Navbar />
      <HeroBanner /> <YogaSection />
      <YogaServiceSection />
      <ContactUs />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      */}
      <Footer />
    </div>
  );
};

export default App;
