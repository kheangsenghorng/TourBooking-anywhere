
const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Tour A</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>&copy; 2023 Tour A. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;