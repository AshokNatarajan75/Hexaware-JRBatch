import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {

    e.preventDefault();
    if(!loginRequest.role){
      toast.error("Please select a user role", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost:6060/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.role === "admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
        } else if (res.role === "patient") {
          sessionStorage.setItem("active-patient", JSON.stringify(res));
        } else if (res.role === "doctor") {
          sessionStorage.setItem("active-doctor", JSON.stringify(res));
        } 

        toast.success("Logged in successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
 
        if (res.role === "admin") {
          navigate("/home");
        window.location.reload(true);
        } else if (res.role === "doctor") {
          navigate("/doctor/appointment/all");
        window.location.reload(true);
         
        } else if (res.role === "patient") {
          navigate("/home");
          window.location.reload(true);
        }
      });
    });
    e.preventDefault();
  };
  if (document.URL.indexOf("admin") !== -1) {
    loginRequest.role = "admin";
  } else if (document.URL.indexOf("patient") !== -1) {
    loginRequest.role = "patient";
  } else if (document.URL.indexOf("doctor") !== -1) {
    loginRequest.role = "doctor";
  }
  return (
    <div>
       
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
      <img src={require('./hos1.jpg')} class="d-block w-100" alt="..." height="500px"></img>

        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="text-center">
            <h4 className="cl">User Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={loginAction}>
              <div class="mb-3 text-color">
                <label for="role" class="form-label">
                  <b>User Role</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="role"
                  required
                >
                  <option value>Select Role</option>
                  <option value="admin"> Receptionist </option>
                  <option value="patient"> Patient </option>
                  <option value="doctor"> Doctor </option>
                </select>
              </div>

              <div className="mb-3 text-color">
                <label for="emailId" class="form-label">
                  <b>Email Id</b>
                </label>
                <input required
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  placeholder="Enter a valid E-mail-Id..."
                  onChange={handleUserInput}
                  value={loginRequest.emailId}
                />
              </div>
              <div className="mb-3 text-color">
                <label for="password" className="form-label">
                  <b>Password</b>
                </label>
                <input required
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Example Password- 1234As@#..."
                  onChange={handleUserInput}
                  value={loginRequest.password}
                  autoComplete="on"
                />
              </div>
              <button
                type="submit"
                className="cl"
              >
                Login
              </button>
              
              
              <ToastContainer />
              
            </form><br/>
            {loginRequest.role === 'patient' &&
              (<div className="d-flex aligns-items-center justify-content-center">
                <Link to="/user/patient/register" className="cl"> New User Resgister</Link>
              </div>)
              }
          </div>
          <Link to='/'>
            <button className="cl">Go Back</button>
        </Link>
        </div>

        
      </div>
    </div>
    
  );
};

export default UserLoginForm;
