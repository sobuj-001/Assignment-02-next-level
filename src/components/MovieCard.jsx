function MovieCard({ show, onDetails }) {
  const imageUrl = show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
      <div>
        <img
          src={imageUrl}
          alt={show.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 truncate">
            {show.name}
          </h2>

          <p className="text-gray-600 mb-2">
            ⭐ {show.rating?.average || "N/A"}
          </p>

          <p className="text-gray-600 mb-4">
            📅 {show.premiered || "Unknown"}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={() => onDetails(show)}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
        >
          See Details
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
