import "./Home.css";
function Home() {
  const login = () => {
    window.location.href = "/login";
  };
  return (
    <div className="home">
      <div className="home-section1">
        <h2>Welcome to Grameena Grandhashala</h2>
        <p>
          Explore a vast collection of books and resources. Find your next great
          read today!
        </p>
        <div className="search-feature">
          <div className="items">
            <div className="item">
              <img src="/cover.jpg" alt="" />
              <h2>Discover New releases</h2>
              <p>Stay up to date with the latest arrivals</p>
            </div>
            <div className="item">
              <img src="/cover.jpg" alt="" />
              <h2>Browse by Genre</h2>
              <p>Dive into different genres.</p>
            </div>
            <div className="item">
              <img src="/cover.jpg" alt="" />
              <h2>Explore Authors</h2>
              <p>Find books by your favorite authors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
