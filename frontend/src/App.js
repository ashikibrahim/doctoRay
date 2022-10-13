import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import UserList from "./pages/Admin/UserList";
import DoctorList from "./pages/Admin/DoctorList";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border" role="status"></div>
          </div>
        )}

        <Toaster position="top-center" reverseOrder={false} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/apply-doctor" element={<ApplyDoctor />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/admin/userslist" element={<UserList />} />
            <Route path="/admin/doctorslist" element={<DoctorList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
