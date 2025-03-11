import React, { useEffect, useState } from "react";

const MeditationMusicSection = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);

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
    <section className="relative md:py-16 py-7 bg-gradient-to-r from-purple-700 to-pink-500 text-black overflow-hidden">
      <div className="relative container mx-auto px-6 z-10">
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
            MEDITATION MUSIC
          </span>
          <h2 className="text-4xl font-bold mt-4">
            Relax & Unwind with Soothing Sounds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <div
              key={index}
              className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white text-black"
            >
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
                  <source src={song.downloadUrl[0]?.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ))}
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
          <button
            onClick={() => {
              if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
              }
              setPlayingSong(null);
              setCurrentAudio(null);
            }}
            className="p-2 text-green-800 rounded-full"
          >
            ✖
          </button>
        </div>
      )}
    </section>
  );
};

export default MeditationMusicSection;
