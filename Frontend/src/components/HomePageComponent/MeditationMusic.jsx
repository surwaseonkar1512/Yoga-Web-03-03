import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const MeditationMusicSection = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);
  const swiperRef = useRef(null);
  const [offsetY, setOffsetY] = useState(20);

  const handleScroll = () => {
    setOffsetY(Math.min(window.scrollY * 0.2, 50)); // Restrict max movement
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          "https://saavn-api-r2hu1.vercel.app/api/search/songs?query=meditation"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setSongs(result.data.results || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handlePlay = (event, song) => {
    if (currentAudio && currentAudio !== event.target) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    event.target.play();
    setCurrentAudio(event.target);
    setPlayingSong(song);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <section className="relative md:py-16 py-7 bg-gradient-to-r from-purple-700 to-pink-500  text-black overflow-hidden">
      <div
        className="absolute -inset-1 bg-white "
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)",
        }}
      ></div>{" "}
      <div className="relative container mx-auto px-6 z-10">
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
            MEDITATION MUSIC
          </span>
          <h2 className="text-4xl font-bold mt-4">
            Relax & Unwind with Soothing Sounds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="relative w-full flex flex-col justify-end items-end z-10 col-span-3 gap-3 md:-right-8">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
              className="mt-8 w-full md:px-6 px-0"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {songs.map((song, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white text-black">
                    <img
                      src={song.image?.[2]?.url}
                      alt={song.name}
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-sm font-bold rounded-full">
                      {song.label || "Unknown Artist"}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{song.name}</h3>
                    </div>
                    {song.downloadUrl && (
                      <audio
                        controls
                        className="w-full px-4 pb-4"
                        onPlay={(event) => handlePlay(event, song)}
                      >
                        <source
                          src={song.downloadUrl[0]?.url}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-end gap-4 md:mr-10 mr-1">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="p-3 bg-white text-green-800 rounded-full shadow-lg"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="p-3 bg-white text-green-800 rounded-full shadow-lg"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <div className="relative w-full flex justify-start">
              <div className="relative w-full -mt-20">
                <img
                  src="https://aonetheme.com/yogar/assets/images/home1/banner/girl.png"
                  alt="Meditation Illustration"
                  className="w-full h-[500px] object-contain rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {playingSong && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-lg flex items-center space-x-4 z-50">
          <img
            src={playingSong.image?.[1]?.url}
            alt={playingSong.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-black font-semibold">{playingSong.name}</p>
            <p className="text-sm text-gray-600">
              {playingSong.primaryArtists}
            </p>
          </div>
          <audio
            controls
            autoPlay
            onPlay={(event) => handlePlay(event, playingSong)}
          >
            <source src={playingSong.downloadUrl[0]?.url} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </section>
  );
};

export default MeditationMusicSection;
