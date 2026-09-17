
function Hero() {
  const scrollToMovies = () => {
    const moviesSection = document.getElementById("movies-section");
    if (moviesSection) {
      moviesSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-900 text-white text-center px-6 py-24">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Discover Movies
      </h1>

      <p className="text-gray-300 max-w-2xl mx-auto mb-8">
        Explore and discover your favorite movies
        from around the world.
      </p>

      <button 
        onClick={scrollToMovies}
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
      >
        Explore Now
      </button>
    </section>
  );
}

export default Hero;