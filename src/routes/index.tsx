import { Navigate, type RouteObject } from "react-router-dom";
import Search from "../pages/Search";
import Images from "../pages/Images";
import News from "../pages/News";
import Videos from "../pages/Videos";


const routes:RouteObject[] = [
    {
        path:'/search',
        element:<Search/>
    },
    {
        path:'/images',
        element:<Images/>
    },
    {
        path:'/news',
        element:<News/>
    },
    {
        path:'videos',
        element:<Videos/>
    },
    {
        index:true,
        element:<Navigate to ='/search' />
    }

]

export default routes