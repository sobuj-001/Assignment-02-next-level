
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [shows, setShows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    setLoading(true);
    const query = searchText.trim() === "" 
      ? "https://api.tvmaze.com/shows" 
      : `https://api.tvmaze.com/search/shows?q=${searchText}`;

    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        let formattedData = searchText.trim() !== "" ? data.map((item) => item.show) : data;
        
        // এখানে আমরা ফিল্টার করে শুধু সেই মুভিগুলো রাখছি যেগুলোর ছবি বা medium ইমেজ আছে
        formattedData = formattedData.filter((show) => show.image && show.image.medium);

        setShows(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setShows([]);
        setLoading(false);
      });
  }, [searchText]);

  const filteredShows = shows.filter((show) => {
    if (!selectedGenre) return true;
    return show.genres?.includes(selectedGenre);
  });

  const handleDownload = (movie) => {
    const movieData = `
Movie Name: ${movie.name}
Rating: ${movie.rating?.average || "N/A"}
Premiered: ${movie.premiered || "N/A"}
Runtime: ${movie.runtime ? `${movie.runtime} mins` : "N/A"}
Genres: ${movie.genres?.join(", ") || "N/A"}
Summary: ${movie.summary ? movie.summary.replace(/<[^>]*>/g, "") : "No summary available."}
    `;

    const blob = new Blob([movieData], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${movie.name}-details.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="movies-section" className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search for a movie..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        />

        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white text-gray-700 font-medium"
        >
          <option value="">All Genres</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        {searchText ? `Search Results for "${searchText}"` : "All Movies"}
      </h1>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="text-gray-600 mt-3 font-medium">Loading movies...</p>
        </div>
      ) : filteredShows.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 font-semibold">কোনো মুভি পাওয়া যায়নি!</p>
          <p className="text-gray-400 mt-1">অন্য নাম বা জেনার দিয়ে আবার চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredShows.map((show) => (
            <MovieCard 
              key={show.id} 
              show={show} 
              onDetails={() => setSelectedMovie(show)} 
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all z-10"
            >
              ✕
            </button>

            <div className="max-h-[85vh] overflow-y-auto">
              {selectedMovie.image?.original && (
                <img
                  src={selectedMovie.image.original}
                  alt={selectedMovie.name}
                  className="w-full h-72 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedMovie.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4 font-medium">
                  <span>⭐ Rating: {selectedMovie.rating?.average || "N/A"}</span>
                  <span>📅 Premiered: {selectedMovie.premiered || "N/A"}</span>
                  <span>⏳ Runtime: {selectedMovie.runtime ? `${selectedMovie.runtime} mins` : "N/A"}</span>
                  <span>🎬 Genres: {selectedMovie.genres?.join(", ") || "N/A"}</span>
                </div>
                <div
                  className="text-gray-600 text-sm leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: selectedMovie.summary || "No summary available." }}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(selectedMovie)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-all"
                  >
                    📥 Download Details
                  </button>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;