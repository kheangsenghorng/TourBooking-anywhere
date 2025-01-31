const ProfileLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Profile Page</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
};

export default ProfileLayout;
