// Running Json Server
// npx json-server --watch db.json --port 8000
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { isValidElement, useState } from 'react';
import { Navigate } from 'react-router-dom';

const SignUpPage = () => {

    const nav = useNavigate();

    let error_message ="Please enter the value for the following:\n"

    const IsValidate=()=>{
        let isproceed = true;
        if (username==null || username==""){
            isproceed=false;
            error_message += "username \n";
        }
        if (password==null || password==""){
            isproceed=false;
            error_message += "password \n";
        }
        if (fullname==null || fullname==""){
            isproceed=false;
            error_message += "full name \n";
        }
        if (email==null || email==""){
            isproceed=false;
            error_message += "email \n";
        }
        if (country==""){
            isproceed=false;
            error_message += "country \n";
        }
        if (!isproceed){
            alert(error_message);
        }
        return isproceed;
    }

    const handleBack = () => {
        nav("/");
    }

    const [username, usernamechange] = useState("");
    const [password, passwordchange] = useState("");
    const [fullname, fullnamechange] = useState("");
    const [email, emailchange] = useState("");
    const [country, countrychange] = useState("");

    const handlesubmit=(e)=>{
        if(IsValidate()){
        e.preventDefault();
        let regobj={username,password,fullname,email,country};
        fetch("http://localhost:8000/user_data",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(regobj)
        }).then((res)=>{
            alert("Registration Success!");
            nav("/");
        }).catch((err)=>{
            alert("Registration Failed" + error_message)
        });
    }}
    
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