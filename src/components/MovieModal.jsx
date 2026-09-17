
export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all z-10"
        >
          ✕
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          {movie.image?.original && (
            <img
              src={movie.image.original}
              alt={movie.name}
              className="w-full h-72 object-cover"
            />
          )}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{movie.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4 font-medium">
              <span>⭐ Rating: {movie.rating?.average || "N/A"}</span>
              <span>📅 Premiered: {movie.premiered || "N/A"}</span>
              <span>🎬 Genres: {movie.genres?.join(", ") || "N/A"}</span>
            </div>
            <div
              className="text-gray-600 text-sm leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: movie.summary || "No summary available." }}
            />
            <button
              onClick={onClose}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
