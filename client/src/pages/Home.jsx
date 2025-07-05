import "./Home.css";
function Home() {
  const login = () => {
    window.location.href = "/login";
  };
  return (
    <div className="home">
      <div className="home-image">
        <h1>Welcome to the Library Management System</h1>
        <p>Manage your books, members, and transactions efficiently.</p>
        <button type="submit" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
export default Home;
