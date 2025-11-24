import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./Layout/SignInPage";
import Home from "./Layout/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<SignInPage />} />
        <Route path="/user/login" element={<SignInPage />} />
        <Route path="/user/signup" element={<SignInPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
