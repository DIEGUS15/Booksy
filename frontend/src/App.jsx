import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import BookPage from "./pages/BookPage";

import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<ProtectedLayout />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/books" element={<BookPage />} />
                </Route>
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;
