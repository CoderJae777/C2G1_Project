import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./login_pages/AdminLoginPage";
import ClientLoginPage from "./login_pages/ClientLoginPage";
import TrainerLoginPage from "./login_pages/TrainerLoginPage";
import AdminHomePage from "./pages_admin/AdminHomePage";
import ClientHomePage from "./pages_client/ClientHomePage";
import TrainerHomePage from "./pages_trainer/TrainerHomePage";
import AdminWorkshopRequestPage from "./pages_admin/AdminWorkshopRequestPage";
import AdminManageTrainerPage from "./pages_admin/AdminManageTrainerPage";
import AdminManageWorkshopPage from "./pages_admin/AdminManageWorkshopPage";
import LoginPage from "./login_pages/LoginPage";
import SignUpPage from "./pages_home/SignUpPage";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages_home/HomePage";
import OurWorkshopPage from "./components/OurWorkshopPage";
import ClientWorkshopPage from "./pages_client/ClientWorkshopPage";
import ProfilePage from "./components/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import TrainerWorkshopPage from "./pages_trainer/TrainerWorkshopPage";
import TrainerViewTrainerPage from "./pages_trainer/TrainerViewTrainerPage";

function App() {

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <ToastContainer theme="colored"></ToastContainer>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/LoginPage" element={<LoginPage />} />
          <Route exact path="/AdminLoginPage" element={<AdminLoginPage />} />
          <Route exact path="/ClientLoginPage" element={<ClientLoginPage />} />
          <Route
            exact
            path="/TrainerLoginPage"
            element={<TrainerLoginPage />}
          />
          <Route exact path="/SignUpPage" element={<SignUpPage />} />
          <Route exact path="/AdminHomePage" element={<AdminHomePage />} />
          <Route exact path="/ClientHomePage" element={<ClientHomePage />} />
          <Route exact path="/TrainerHomePage" element={<TrainerHomePage />} />
          <Route
            exact
            path="/AdminWorkshopRequestPage"
            element={<AdminWorkshopRequestPage />}
          />
          <Route
            exact
            path="/AdminManageTrainerPage"
            element={<AdminManageTrainerPage />}
          />
          <Route
            exact
            path="/AdminManageWorkshopPage"
            element={<AdminManageWorkshopPage />}
          />
          <Route exact path="/OurWorkshopPage" element={<OurWorkshopPage />} />
          <Route
            exact
            path="/AdminManageTrainerPage"
            element={<AdminManageTrainerPage />}
          />
          <Route
            exact
            path="/ClientWorkshopPage"
            element={<ClientWorkshopPage />}
          />
          <Route exact path="/ProfilePage" element={<ProfilePage />} />
          <Route
            exact
            path="/TrainerWorkshopPage"
            element={<TrainerWorkshopPage />}
          />
          <Route
            exact
            path="/TrainerViewTrainerPage"
            element={<TrainerViewTrainerPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
