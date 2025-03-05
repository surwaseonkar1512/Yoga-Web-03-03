import React from "react";
import Navbar from "../components/HomePageComponent/Navbar";
import HeroBanner from "../components/HomePageComponent/HeroBanner";
import YogaSection from "../components/HomePageComponent/YogaSection";
import YogaServiceSection from "../components/HomePageComponent/YogaServiceSection";
import YogaScheduleTable from "../components/HomePageComponent/YogaTable";
import WhyChooseUs from "../components/HomePageComponent/WhyChooseUs";
import NutritionRecipesSection from "../components/HomePageComponent/NutritionRecipesSection";
import ZenYoga from "../components/HomePageComponent/ZenYoga";
import MeditationMusicSection from "../components/HomePageComponent/MeditationMusic";
import ContactUs from "../components/HomePageComponent/ContactUs";
import WellnessSection from "../components/HomePageComponent/WellnessSection";

const HomePage = () => {
  return (
    <div className=" mx-auto w-full">
      <HeroBanner />

      <YogaSection />
      <WellnessSection />

      <YogaServiceSection />
      <YogaScheduleTable />

      <WhyChooseUs />
      <NutritionRecipesSection />

      <ZenYoga />
      <MeditationMusicSection />
      <ContactUs />
    </div>
  );
};

export default HomePage;
