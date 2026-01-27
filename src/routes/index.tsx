import { Navigate, type RouteObject } from "react-router-dom";
import Search from "../pages/Search";
import Images from "../pages/Images";

const routes: RouteObject[] = [
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/images",
    element: <Images />,
  },
  {
    index: true,
    element: <Navigate to="/search" />,
  },
];

export default routes;
