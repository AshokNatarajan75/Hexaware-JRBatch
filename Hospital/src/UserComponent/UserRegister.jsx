import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee)

const UserRegister = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
    bloodGroup: "",
    specialist: "",
  });

  if (document.URL.indexOf("admin") !== -1) {
    user.role = "admin";
  } else if (document.URL.indexOf("patient") !== -1) {
    user.role = "patient";
  } else if (document.URL.indexOf("doctor") !== -1) {
    user.role = "doctor";
  }

  console.log("ROLE FECTHED : " + user.role);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const [genders, setGenders] = useState([]);
  const [bloodGroup, setBloodGroup] = useState([]);
  // const [specialists, setSpecialists] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:6060/api/user/gender");
    return response.data;
  };

  const retrieveAllBloodGroups = async () => {
    const response = await axios.get(
      "http://localhost:6060/api/patient/bloodgroup/all"
    );
    return response.data;
  };

  // const retrieveAllSpecialist = async () => {
  //   const response = await axios.get(
  //     "http://localhost:6060/api/doctor/specialist/all"
  //   );
  //   return response.data;
  // };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    const getAllBloodGroup = async () => {
      const allBloodGroups = await retrieveAllBloodGroups();
      if (allBloodGroups) {
        setBloodGroup(allBloodGroups);
      }
    };

    // const getAllSpecialist = async () => {
    //   const allSpecialist = await retrieveAllSpecialist();
    //   if (allSpecialist) {
    //     setSpecialists(allSpecialist);
    //   }
    // };

    getAllGenders();
    getAllBloodGroup();
    // getAllSpecialist();
  }, []);

  const saveUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:6060/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      toast.success("Registered Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/user/login");
      window.location.reload(true);

      result
        .json()
        .then((res) => {
          console.log("response", res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  


  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">

        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="text-center">
            <h5 className="cl">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter the First Name..."
                  onChange={handleUserInput}
                  value={user.firstName}
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{3,}"
                  title="First Name should be atleast 3 characters and First letter should be in Caps"
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter the Last Name..."
                  onChange={handleUserInput}
                  value={user.lastName}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input required
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  placeholder="Enter a valid E-mail-Id..."
                  onChange={handleUserInput}
                  value={user.emailId}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="quantity" className="form-label">
                  <b>Create Password</b>
                </label>
                <div className="input-group">
                <input required
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Example Password-1234As@#..."
                  onChange={handleUserInput}
                  value={user.password}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                  title="Password must contain atleast 8 characters, including 1 number, 1 lowercase, 1 uppercase and 1 special character."
                />
                {user.password && (
                       (<div className="input-group-append">
                       <span className="input-group-text" style={{height: "38px"}}>                       
                  <FontAwesomeIcon icon={faThumbsUp} rotation={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(user.password) ?0:180} 
                      style={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(user.password) ?{color:"#00ff00",}:{color:"red",}} />
                  </span>
                  </div>
                ))} 
                </div>
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="sex" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="sex"
                  required
                >
                  <option value="">Select Gender</option>

                  {genders.map((gender) => {
                    return <option value={gender}> {gender} </option>;
                  })}
                </select>
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="bloodGroup" className="form-label">
                  <b>Blood Group</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="bloodGroup"
                  required
                >
                  <option value="">Select Blood Group</option>

                  {bloodGroup.map((bg) => {
                    return <option value={bg}> {bg} </option>;
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input required
                  type="number"
                  className="form-control"
                  id="contact"
                  name="contact"
                  placeholder="Enter your Contact Number..."
                  onChange={handleUserInput}
                  value={user.contact}
                  pattern=".{10,}"
                  title="Mobile Number should be 10 Numbers"
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="contact" className="form-label">
                  <b>Age</b>
                </label>
                <input required
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  placeholder="Enter Your Age..."
                  onChange={handleUserInput}
                  value={user.age}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b> Street</b>
                </label>
                <textarea required
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  placeholder="Enter your Street Name..."
                  onChange={handleUserInput}
                  value={user.street}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="price" className="form-label">
                  <b>City</b>
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Enter your City Name..."
                  onChange={handleUserInput}
                  value={user.city}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="pincode" className="form-label">
                  <b>Pincode</b>
                </label>
                <input required
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter your area Pincode..."
                  onChange={handleUserInput}
                  value={user.pincode}
                />
              </div>
              {user.role === 'patient' ?
              (<div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="cl"
                  value="Register User"
                />
              </div>)
              :
              (<div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="cl"
                  value="Register Admin"
                />
              </div>)
              }
              <ToastContainer />


              <Link to='/'>
            <button className="cl">Back</button>
        </Link>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
