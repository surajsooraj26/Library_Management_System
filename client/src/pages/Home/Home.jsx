import "./Home.css";
import BookCard from "../../components/BookCard/BookCard";
import { useLogin } from "../../context/LoginContext";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const { showLogin, setShowLogin } = useLogin();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const featuredBooks = [
    {
      id: 1,
      title: "Book One ",
      author: "Author A",
      cover:
        "https://dcbookstore.com/uploads/product/images/4126425302651-arya.JPG",
    },
    {
      id: 2,
      title: "Book Two",
      author: "Author B",
      cover:
        "https://dcbookstore.com/uploads/product/images/27996172415997-themma.JPG",
    },
    {
      id: 3,
      title: "Book Three",
      author: "Author C",
      cover:
        "https://dcbookstore.com/uploads/product/images/37459681296249-Capture.PNG",
    },
    {
      id: 4,
      title: "Book Four",
      author: "Author D",
      cover:
        "https://dcbookstore.com/uploads/product/images/78982414170064-marip.JPG",
    },
    {
      id: 5,
      title: "Book Five",
      author: "Author E",
      cover:
        "https://dcbookstore.com/uploads/product/images/35218236598963-pala-jan.JPG",
    },
    {
      id: 6,
      title: "Book Six",
      author: "Author F",
      cover:
        "https://dcbookstore.com/uploads/product/images/2109813621795-marath.JPG",
    },
    {
      id: 7,
      title: "Book Seven",
      author: "Author G",
      cover:
        "https://dcbookstore.com/uploads/product/images/57869711040270-agne.JPG",
    },
    {
      id: 8,
      title: "Book Eight",
      author: "Author H",
      cover:
        "https://dcbookstore.com/uploads/product/images/39638022867850-theen.JPG",
    },
  ];

  const login = () => {
    window.location.href = "/login";
  };
  return (
    <div
      className={showLogin ? "home dimmed" : "home"}
      onClick={() => setShowLogin(false)}
    >
      <div className="home-section1">
        <h2>Welcome to Grameena Grandhashala</h2>
        <p>
          Explore a vast collection of books and resources. Find your next great
          read today!
        </p>
        <div className="search-feature">
          <div className="items">
            <div className="item">
              <img src="/home1.jpeg" alt="" />
              <h2>Discover New releases</h2>
              <p>Stay up to date with the latest arrivals</p>
            </div>
            <div className="item">
              <img src="/home2.jpeg" alt="" />
              <h2>Browse by Genre</h2>
              <p>Dive into different genres.</p>
            </div>
            <div className="item">
              <img src="/home3.jpeg" alt="" />
              <h2>Explore Authors</h2>
              <p>Find books by your favorite authors.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section2">
        <h2 className="featured-book">Featured Books</h2>
        <div className="book-list">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
