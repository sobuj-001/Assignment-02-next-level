function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h2 className="text-xl font-bold">
          🎬 MovieExplorer
        </h2>

        <div className="flex items-center gap-6">
          <a href="/" className="hover:text-orange-400">
            Home
          </a>

          <a href="/movies" className="hover:text-orange-400">
            Movies
          </a>

          <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">
            Explore Movies
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;