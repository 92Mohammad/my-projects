import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/Login";
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage isLogin = {false} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todoPage" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
