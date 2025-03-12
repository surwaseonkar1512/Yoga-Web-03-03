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
        if (result.data.results.length > 0) {
          setPlayingSong(result.data.results[3]);
        }
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

  if (loading) return <p className="h-screen text-center py-10">Loading...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <section className="relative py-7 md:py-16 text-black overflow-hidden mt-20 px-4 md:px-10">
      <div className="text-center mb-8 md:mb-12">
        <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
          MEDITATION MUSIC
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Relax & Unwind with Soothing Sounds
        </h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-100 md:w-1/4 w-full h-64 md:h-[90vh] overflow-auto p-4 rounded-lg">
          <h3 className="text-lg text-center font-bold mb-4">Playlist</h3>
          <ul>
            {songs.map((song, index) => (
              <li
                key={index}
                className="flex items-center py-2 cursor-pointer hover:bg-gray-200 rounded-lg p-2"
                onClick={() => setPlayingSong(song)}
              >
                <img
                  src={song.image?.[0]?.url}
                  alt={song.name}
                  className="w-12 h-12 rounded-md mr-3"
                />
                <div>
                  <p className="text-sm font-semibold">{song.name}</p>
                  <p className="text-xs text-gray-500">{song.primaryArtists}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:w-3/4 w-full mt-6 md:mt-0 md:pl-6">
          {playingSong && (
            <div className="bg-white shadow-lg p-4 rounded-lg overflow-hidden">
              <h3 className="text-lg font-bold mb-4 text-center md:text-left">
                Now Playing
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                  <img
                    src={playingSong.image?.[1]?.url}
                    alt={playingSong.name}
                    className="w-full h-64 md:h-[70vh] object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <p className="text-xl font-bold">{playingSong.name}</p>
                  <p className="text-gray-600">
                    {playingSong.artists.primary[0]?.name}
                  </p>
                  <p className="text-gray-500">
                    Album: {playingSong.album.name}
                  </p>
                  <p className="text-gray-500">Year: {playingSong.year}</p>
                  <p className="text-gray-500">Label: {playingSong.label}</p>
                  <p className="text-gray-500">
                    Language: {playingSong.language}
                  </p>
                  <audio
                    controls
                    autoPlay
                    className="w-full mt-2"
                    onPlay={(event) => handlePlay(event, playingSong)}
                  >
                    <source
                      src={playingSong.downloadUrl[0]?.url}
                      type="audio/mpeg"
                    />
                  </audio>
                  <div>
                    <h3 className="text-lg font-bold mt-6">Related Songs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {songs.map((song, index) => (
                        <div
                          key={index}
                          className="flex items-center py-2 cursor-pointer hover:bg-gray-200 rounded-lg p-2"
                          onClick={() => setPlayingSong(song)}
                        >
                          <img
                            src={song.image?.[0]?.url}
                            alt={song.name}
                            className="w-10 h-10 rounded-md mr-2"
                          />
                          <div>
                            <p className="text-sm font-semibold">{song.name}</p>
                            <p className="text-xs text-gray-500">
                              {song.primaryArtists}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MeditationMusicSection;
