import { RouterProvider } from "react-router-dom";
import router from "./components/router.jsx";
import UserContextProvider from "./context/UserContextProvider.js";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;