import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Pages
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/moviedetail:id" element={<MovieDetail />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter