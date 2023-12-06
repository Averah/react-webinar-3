import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Article from "../article";
import Main from "../main";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/page/1" replace={true} />,
    // element: <Main />
  },
  {
    path: "/page/:pageNumber",
    element: <Main />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
]);