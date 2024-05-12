import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const history=useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:[e.target.value]});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:credentials.email[0],password:credentials.password[0]})
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem('token',json.authToken);
            history("/");
            props.showAlert("Logged in Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    return (
        <div className="container" style={{border:'1px solid grey',padding:'10px',borderRadius:"10px"}}>
        <h2 style={{textAlign:'center'}}>Enter your credentials to Login!</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <div className="form-group" style={{margin:"20px"}}>
                <label htmlFor="email">Email address</label>
                <input onChange={onChange} value={credentials.email} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group" style={{margin:"20px"}}>
                <label htmlFor="password">Password</label>
                <input onChange={onChange} value={credentials.password} name="password" type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <button  type="submit" className="btn btn-primary" style={{marginLeft:'20px'}}>Submit</button>
        </form>
      </div>
    )
}

export default Login