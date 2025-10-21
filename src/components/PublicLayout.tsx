import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

const PublicLayout: React.FC = () => {
  const { userId } = useContext(UserContext);

  return (
    !Boolean(userId) && (
      <div>
        <header>
          <h1>Welcome to the Public Layout</h1>
        </header>
        <main>
          <p>This is the public area of the application.</p>
        </main>
      </div>
    )
  );
};

export default PublicLayout;
