import { RouterProvider } from "react-router-dom";
import router from "./components/routing/router.tsx";
import UserContextProvider from "./context/UserContextProvider.js";
import { ThemeProvider } from "./components/themes/ThemeProvider.tsx";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
