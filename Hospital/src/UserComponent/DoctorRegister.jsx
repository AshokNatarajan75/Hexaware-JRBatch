import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const DoctorRegister = () => {
  const navigate = useNavigate();
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
    specialist: "",
    experience: "",
  });

  user.role = "doctor";

  // const [selectedImage, setSelectedImage] = useState(null);

  console.log("ROLE FECTHED : " + user.role);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:6060/api/user/gender");
    return response.data;
  };

  const retrieveAllSpecialist = async () => {
    const response = await axios.get(
      "http://localhost:6060/api/doctor/specialist/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    const getAllSpecialist = async () => {
      const allSpecialist = await retrieveAllSpecialist();
      if (allSpecialist) {
        setSpecialists(allSpecialist);
      }
    };

    getAllGenders();
    getAllSpecialist();
  }, []);

  const saveUser = (event) => {
    event.preventDefault();

    const formData = new FormData();
    // formData.append("image", selectedImage);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("emailId", user.emailId);
    formData.append("password", user.password);
    formData.append("contact", user.contact);
    formData.append("street", user.street);
    formData.append("city", user.city);
    formData.append("pincode", user.pincode);
    formData.append("role", user.role);
    formData.append("age", user.age);
    formData.append("sex", user.sex);
    formData.append("specialist", user.specialist);
    formData.append("experience", user.experience);

    axios
      .post("http://localhost:6060/api/doctor/register", formData)
      // .then((result) => {
      //   result.json()
      .then((res) => {
          console.log(res);
          toast.success("Doctor Registered Successfully!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/home");
          window.location.reload(true);
        });
      // });
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
            <form className="row g-3" onSubmit={saveUser} encType="multipart/form-data">
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>
                <input required
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter the First Name of Doctor..."
                  onChange={handleUserInput}
                  value={user.firstName}
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
                  placeholder="Enter the Last Name of Doctor..."
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
                  placeholder="Enter the E-Mail-Id of Doctor..."
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
                  title="Password must contain at least 8 characters, including 1 number, 1 lowercase, 1 uppercase and 1 special character."

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
                >
                  <option value="0">Select Gender</option>

                  {genders.map((gender) => {
                    return <option value={gender}> {gender} </option>;
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="bloodGroup" className="form-label">
                  <b>Specialist</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="specialist"
                >
                  <option value="">Select Specialist</option>

                  {specialists.map((s) => {
                    return <option value={s}> {s} </option>;
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
                  placeholder="Enter the valid Contact Number..."
                  onChange={handleUserInput}
                  value={user.contact}
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
                  placeholder="Enter the Age of Doctor..."
                  onChange={handleUserInput}
                  value={user.age}
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="contact" className="form-label">
                  <b>Experience</b>
                </label>
                <input required
                  type="number"
                  className="form-control"
                  id="experience"
                  name="experience"
                  placeholder="Enter the Experience of Doctor..."
                  onChange={handleUserInput}
                  value={user.experience}
                />
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Street</b>
                </label>
                <textarea required
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  placeholder="Enter the Street Name..."
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
                  placeholder="Enter the City Name..."
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
                  placeholder="Enter the Pincode..."
                  onChange={handleUserInput}
                  value={user.pincode}
                />
              </div>

              {/* <div className="col-md-6 mb-3 text-color">
                <label htmlFor="image3" className="form-label">
                  <b> Select Doctor Image</b>
                </label>
                <input required
                  className="form-control"
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </div> */}

              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="cl"
                  value="Register Doctor"
                />
              </div>

              <ToastContainer />

              <Link to='/'>
            <button className="cl">Go Back</button>
        </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;
