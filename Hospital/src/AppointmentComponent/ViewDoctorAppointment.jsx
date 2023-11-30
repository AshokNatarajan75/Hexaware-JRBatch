import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const ViewDoctorAppointment = () => {
  const [allAppointments, setAllAppointments] = useState([]);

  const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));

  useEffect(() => {
    const getAllAppointments = async () => {
      const allAppointments = await retrieveAllAppointments();
      if (allAppointments) {
        setAllAppointments(allAppointments);
      }
    };

    getAllAppointments();
  }, []);

  const retrieveAllAppointments = async () => {
    const response = await axios.get(
      "http://localhost:6060/api/appointment/doctor/id?doctorId="+doctor.id
    );
    console.log(response.data);
    return response.data;
  };
  
  const generatePdf = (a) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("times new roman", "bold");
    doc.text("Receipt", 90, 20);
    doc.setFontSize(12);
    doc.setFont("times new roman", "normal");
    doc.text("Patient Name          :  " + a.patientName, 70, 30);
    doc.text("Patient Contact       :  " + a.patientContact, 70, 40);
    doc.text("Patient Problem      :  " + a.problem, 70, 50);
    doc.text("Doctor Name          :  " + a.doctorName, 70, 60);
    doc.text("Prescription             :  " + a.prescription, 70, 70);
    doc.text("Date                         :  " + a.date, 70, 80);
    doc.text("Appointment Date   :  " + a.appointmentDate, 70, 90);
    doc.text("Appointment Time   :  " + a.timeSlot, 70, 100);    
    doc.text("Status                       :  " + a.status, 70, 110);
    doc.text("Price                         :  " + a.price, 70, 120);
    doc.text("        --------Thank You--------" , 70, 140);
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10);
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("times new roamn", "normal");
    doc.line(10, 10, 200, 10);
    doc.line(200, 10, 200, 280);
    doc.line(200, 280, 10, 280);
    doc.line(10, 280, 10, 10);
    doc.text(`Page ${i} of ${totalPages}`, 90, 285);

    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10);
    }
    doc.save("Receipt.pdf");
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="cl text-center">
          <h2>All Appointments</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Patient Contact</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Doctor Name</th>
                  <th scope="col">Precription</th>
                  <th scope="col">Appointment Take Date</th>
                  <th scope="col">Appointment Date</th>
                  <th scope="col">Time Slot</th>
                  <th scope="col">Appointment Status</th>
                  <th scope="col">Appointment Price</th>
                   <th scope="col">Action</th>
                   <th scope="col">PDF</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments.map((a) => {
                  return (
                    <tr>
                      <td>
                        <b>{a.patientName}</b>
                      </td>
                      
                      <td>
                        <b>{a.patientContact}</b>
                      </td>
                      <td>
                        <b>{a.problem}</b>
                      </td>
                      <td>
                        <b>{a.doctorName}</b>
                      </td>
                      <td>
                        <b>{a.prescription}</b>
                      </td>
                      <td>
                        <b>{a.date}</b>
                      </td>
                      <td>
                        <b>{a.appointmentDate}</b>
                      </td>
                      <td>
                        <b>{a.timeSlot}</b>
                      </td>
                      <td>
                        <b>{a.status}</b>
                      </td>
                      <td>
                        <b>{a.price}</b>
                      </td>
                      <td>
                        <Link to={`/doctor/appointment/${a.id}/update`} className="btn btn-sm bg-color custom-bg-text" aria-current="page">
                       Update Appointment
                       </Link>
                      </td>
                      <td>
                        <button className="cl"
                        onClick={() => generatePdf(a)}
                        >Generate PDF</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to='/'>
            <button className="cl">Go Back</button>
        </Link>
       
        </div>
       
      </div>
    </div>
  );
};

export default ViewDoctorAppointment;
