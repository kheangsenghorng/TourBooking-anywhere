const TourLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Tour Page</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tours">Tours</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2025 Tour Company</p>
      </footer>
    </div>
  );
};

export default TourLayout;
