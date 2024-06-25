import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' ;
import AdminLoginPage from './AdminLoginPage';
import ClientLoginPage from './ClientLoginPage';
import TrainerLoginPage from './TrainerLoginPage';
import AdminHomePage from './AdminHomePage';
import ClientHomePage from './ClientHomePage';
import TrainerHomePage from './TrainerHomePage';
import Navbar from './NavBar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import {ToastContainer} from "react-toastify";


function App() {
  return (
    <Router>
      <div className='NavBar'>
        < Navbar />
      </div>
      <div className="App">
      <ToastContainer theme="colored">
      </ToastContainer>
        <Routes>
          <Route exact path = "/" element={<LoginPage/>}/>
          <Route exact path = "/AdminLoginPage" element={<AdminLoginPage/>}/>
          <Route exact path="/ClientLoginPage" element={<ClientLoginPage/>}/>
          <Route exact path="/TrainerLoginPage" element={<TrainerLoginPage/>}/>
          <Route exact path="/SignUpPage" element={<SignUpPage/>}/>
          <Route path ="/AdminHomePage" element={<AdminHomePage/>}/>
          <Route path ="/ClientHomePage" element={<ClientHomePage/>}/>
          <Route path ="/TrainerHomePage" element={<TrainerHomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
