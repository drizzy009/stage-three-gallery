import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route
            path="/gallery"
            element={
              <ProtectedRoutes>
                <GalleryPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
