// Running Json Server
// npx json-server --watch db.json --port 8000
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const SignUpPage = () => {

    const nav = useNavigate();

    const handleBack = () => {
        nav("/");
    }

    const [username, usernamechange] = useState("");
    const [password, passwordchange] = useState("");
    const [fullname, fullnamechange] = useState("");
    const [email, emailchange] = useState("");
    const [country, countrychange] = useState("");

    const handlesubmit=(e)=>{
        e.preventDefault();
        let regobj={username,password,fullname,email,country};
        fetch("http://localhost:8000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(regobj)
        }).then((res)=>{
            alert("Registration Success!");
            nav("/");
        }).catch((err)=>{
            alert("Registration Failed")
        });
    }
    
    return (
        <>
            <div>
                <div className="signuppage">
                    <form className='contrainer' onSubmit={handlesubmit}>
                        <div className="card">
                            <div className="card-header">
                                <h1>New User Registration!</h1>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>User Name:  <span className="errmsg">* </span></label>
                                            <input value={username} onChange={e=>usernamechange(e.target.value)} className="form_control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form_group">
                                            <label>Password:  <span className="errmsg">* </span></label>
                                            <input type='password' value={password} onChange={e=>passwordchange(e.target.value)} className="form_control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form_group">
                                            <label>Fullname:  <span className="errmsg">* </span></label>
                                            <input value={fullname} onChange={e=>fullnamechange(e.target.value)} className="form_control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form_group">
                                            <label>Email:  <span className="errmsg">* </span></label>
                                            <input value={email} onChange={e=>emailchange(e.target.value)} className="form_control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form_group">
                                            <label>Country:  <span className="errmsg">*</span></label>
                                            <select value={country} onChange={e=>countrychange(e.target.value)} className="form_control">
                                                <option value="Default">--Select--</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Singapore">USA</option>
                                                <option value="Singapore">Malaysia</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div classname="card-footer">
                                <button type="submit" className="signup_submit_button">Register</button>
                                <button className="signup_back_button" onClick={handleBack}>Back</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;