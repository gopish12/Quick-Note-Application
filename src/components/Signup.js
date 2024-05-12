import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const history=useNavigate();
    const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword:""});
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:[e.target.value]});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.password[0]!==credentials.cpassword[0]){
          console.log(credentials.password,credentials.cpassword)
          alert("The passwords do not match");
          return;
        }
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:credentials.name[0],email:credentials.email[0],password:credentials.password[0]})
        });
        const json=await response.json();
        if(json.success){
          console.log(json);
            localStorage.setItem('token',json.authToken);
            history("/");
            props.showAlert("User created Successfully","success");
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }
    return (
      <div className="container" style={{border:'1px solid grey',padding:'10px',borderRadius:"10px"}}>
        <h2 style={{textAlign:'center'}}>Enter your credentials to Signup!</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <div className="form-group" style={{margin:"20px"}}>
                <label htmlFor="name">Name</label>
                <input required minLength={5} onChange={onChange} value={credentials.name} name="name" type="emaitext" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your name" />
            </div>
            <div className="form-group" style={{margin:"20px"}}>
                <label htmlFor="email">Email address</label>
                <input required minLength={5} onChange={onChange} value={credentials.email} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group" style={{margin:"20px"}}>
                <label htmlFor="password">Password</label>
                <input required minLength={5} onChange={onChange} value={credentials.password} name="password" type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <div className="form-group" style={{margin:"20px"}}>
                <label htmlFor="cpassword">Confirm Password</label>
                <input required minLength={5} onChange={onChange} value={credentials.cpassword} name="cpassword" type="password" className="form-control" id="cpassword" placeholder="Confirm your password" />
            </div>
            <button  type="submit" className="btn btn-primary" style={{marginLeft:'20px'}}>Submit</button>
        </form>
      </div>
    )
}

export default Signup