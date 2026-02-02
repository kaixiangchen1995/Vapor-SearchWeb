import { useEffect, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./routes/index";

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const { pathname } = useLocation();

  //use Ref bind with a dom
  const scrollContainerRef = useRef<HTMLElement>(null);
  // reset scollbar
  useEffect(() => {
    if (scrollContainerRef.current) {
      // scroll to the top when pathname change
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);

  return (
    <>
      <div className={darkTheme ? "dark" : ""}>
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 h-screen flex flex-col">
          <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <main
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto scroll-smooth"
          >
            <div className="max-w-7xl mx-auto p-4">{useRoutes(routes)}</div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
