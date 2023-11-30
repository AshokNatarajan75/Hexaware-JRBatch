import axios from "axios";
import { useState, useEffect } from "react";
// import DoctorCard from "../UserComponent/DoctorCard";

const Menubar_Admin = () => {
  const [allDoctor, setAllDoctor] = useState([]);

  const retrieveAllDoctor = async () => {
    const response = await axios.get("http://localhost:6060/api/doctor/all");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getAllDoctor = async () => {
      const allDoctor = await retrieveAllDoctor();
      if (allDoctor) {
        setAllDoctor(allDoctor);
      }
    };

    getAllDoctor();
  }, []);

  return (
    <div className="container-fluid mb-2">
     


      {/* <h4><span>Doctors</span></h4> */}



      <div class="row g-2">

        {/* <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/LohyFIN.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Ankita Jais</h5>
                <small>Neurosurgeon</small>
                <small>Experience-10 Yrs</small>

                <div class="ratings mt-2">

                    <i class="fa fa-star">**</i>
                    <i class="fa fa-star">*</i>
                    <i class="fa fa-star">*</i>
                    <i class="fa fa-star">*</i>
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div>




        <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/o5uMfKo.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Tanya Jaiswal</h5>
                <small>Cardiologist</small>
                <small>Experience-8 Yrs</small>
                <div class="ratings mt-2">

                    <i class="fa fa-star">***</i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div>




        <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/tmdHXOY.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Chayan Jain</h5>
                <small>Surgeon</small>
                <small>Experience-20 Yrs</small>
                <div class="ratings mt-2">

                    <i class="fa fa-star">****</i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div>




        <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/C4egmYM.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Paul Reddy</h5>
                <small>Dentist</small>
                <small>Experience-25 Yrs</small>
                <div class="ratings mt-2">

                    <i class="fa fa-star">*****</i>
                    <i class="fa fa-star"></i>
                   
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div>



        <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/HFpxxJz.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Anushka jain</h5>
                <small>Eye Specialist</small>
                <small>Experience-6 Yrs</small>
                <div class="ratings mt-2">

                    <i class="fa fa-star">**</i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div>


        <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/ZSkeqnd.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Tina Gupta</h5>
                <small>Urology</small>
                <small>Experience-12 Yrs</small>
                <div class="ratings mt-2">

                    <i class="fa fa-star">****</i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div>



        <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/MZm1LNz.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Anjani Jorawanshi</h5>
                <small>Neurosurgeon</small>
                <small>Experience-18 Yrs</small>
                <div class="ratings mt-2">

                    <i class="fa fa-star">****</i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div>



        <div class="col-md-3">

            <div class="card p-2 py-3 text-center">

                <div class="img mb-2">

                    <img src="https://i.imgur.com/HFpxxJz.jpg" width="70" class="rounded-circle"></img>
                    
                </div>

                <h5 class="mb-0">Patey Cruiser</h5>
                <small>Neurosurgeon</small>
                <small>Experience-22 Yrs</small>
                <div class="ratings mt-2">

                    <i class="fa fa-star">*****</i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    
                </div>

                <div class="mt-4 apointment">

                    <button class="btn btn-success text-uppercase"></button>
                    
                </div>

            </div>
            
        </div> */}



        
        {/* <div class="container p-3">
		<p class="text-center fs-2 ">Key Features of our Hospital</p>

		<div class="row">
			<div class="col-md-3 p-5">
						<div class="card paint-card">
							<div class="card-body">
								<p class="fs-5">100% Safety</p>
								<p> Maintaining a safe environment reflects a level of competent healthcare that must be fulfilled for patient safety. waste management, noise, and infection control; and external factors such as sources and treatment of water, sewage treatment and disposal</p>
					</div>
                    </div>
                    </div>
                    <div class="col-md-3 p-5">
						<div class="card paint-card">
							<div class="card-body">
								<p class="fs-5">Clean Environment</p>
								<p>Determination of environmental cleaning procedures for individual patient care areas, including frequency, method, and process, should be based on the risk of pathogen transmission.Risk determines cleaning frequency, method, and process in routine and contingency cleaning schedules for all patient care areas. </p>
							</div>
						</div>
					</div>
                    <div class="col-md-3 p-5">
						<div class="card paint-card">
							<div class="card-body">
								<p class="fs-5">Friendly Doctors</p>
								<p>Being a good listener is critical to being a good doctor.Make sure that her patients get recommended screening tests, that their questions are answered, and that patients have a clear plan of action</p>
							</div>
						</div>
					</div>
                    <div class="col-md-3 p-5">
						<div class="card paint-card">
							<div class="card-body">
								<p class="fs-5">Medical Research</p>
								<p>provide important information about disease trends and risk factors, outcomes of treatment or public health interventions, functional abilities, patterns of care, and health care costs and use. The different approaches to research provide complementary insights. Clinical trials can provide important information about the efficacy and adverse effects of medical interventions by controlling the variables that could impact the results of the study.</p>
							</div>
						</div>
					</div>
				</div>
			</div> */}



      <div className="mt-2 mb-5">
        <div className="row">
        <div className="col-md-12">
        <h2 className="mb-4 text-center"><span>Meet Our Doctors</span></h2>
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {allDoctor.map((doctor) => (
                <div className="col" key={doctor.id}>
                    <div className="card">
                        <img src={"http://localhost:6060/api/doctor/" + doctor.doctorImage} className="card-img-top" alt={doctor.firstName} />
                        <div className="card-body">
                            <h5 className="card-title">{doctor.firstName} {doctor.lastName}</h5>
                            <p className="card-text">{doctor.specialist}</p>
                            <p className="card-text">Experience: {doctor.experience} years</p>
                            <button className="btn btn-primary">Book Appointment</button>
                {/* <DoctorCard item={doctor} />; */}
                </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr />


        
    </div>
       

    </div>
  );
};

export default Menubar_Admin;
