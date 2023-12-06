import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./app-router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <RouterProvider router={AppRouter} />
  );
}

export default App;
