import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="text-center p-10 mt-10 border-t dark:border-gray-700 border-gray-200">
      <div className="flex justify-center space-x-6 mb-4">
        <NavLink
          to="/search"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Hacker News
        </NavLink>
        <NavLink
          to="/images"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Unsplash
        </NavLink>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        © 2026 Vapor Search. All rights reserved.
      </p>
    </div>
  );
}
