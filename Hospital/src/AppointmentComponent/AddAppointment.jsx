import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'

const AddAppointment = () => {

  const patient = JSON.parse(sessionStorage.getItem("active-patient"));

  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    patientId: "",
    problem: "",
    appointmentDate: "",
    selectedTimeSlot: "",
  });

  const timeSlots = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"];

  appointment.patientId = patient.id;

  const handleUserInput = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleTimeSlotChange = (timeSlot) => {
    setAppointment({...appointment, selectedTimeSlot: timeSlot});
  };

  const saveAppointment = (event) => {
    event.preventDefault();
    const payload = {
      ...appointment,
      timeSlot: appointment.selectedTimeSlot,
    };

    fetch("http://localhost:6060/api/appointment/patient/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((result) => {
      
      toast.success("Appointment Added Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/patient/appointments");
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
          style={{ width: "25rem" }}
        >
          <div className="cl text-center">
            <h5 className="card-title">Take Appointment</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveAppointment}>
              
              <div className="mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b>Problem</b>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="problem"
                  name="problem"
                  onChange={handleUserInput}
                  value={appointment.problem}
                  placeholder="mention your problems here..."
                />
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Appointment Date</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="appointmentDate"
                  name="appointmentDate"
                  onChange={handleUserInput}
                  value={appointment.appointmentDate}
                />
                <div className="mt-2">
                <label htmlFor="description" className="form-label">
                  <b>Choose the Time Slot</b>
                </label>
                <br/>
                  {timeSlots.map((timeSlot, index) => (
                    <label key={index} className="mx-2">
                      <input
                        type="radio"
                        name="timeSlot"
                        value={timeSlot}
                        onChange={() => handleTimeSlotChange(timeSlot)}
                      />
                      {timeSlot}
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="submit"
                className="cl"
                value="Take Appointment"
              />

              <ToastContainer />
            </form>
          </div>
          <Link to='/'>
            <button className="cl">Go Back</button>
        </Link>
          
        </div>

       
      </div>
      
    </div>
  );
};

export default AddAppointment;
