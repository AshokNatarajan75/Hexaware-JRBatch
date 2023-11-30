import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className="text-color ms-5 me-5 mr-5 mt-3">
      <div className="container mt-4" >
       <h5 className="text-center mb-4" style={{ fontSize: '40px' ,fontWeight:'bold',marginTop:'70px'}}>
         Our Specialities
       </h5>
       </div>
      <h4>A hospital is a health care institution providing patient treatment
       with specialized health science and auxiliary healthcare staff and medical equipment.
       compassionate care for patients and families during the journey through life-limiting illness. 
       Heritage Hospice, Inc. enhances life by empowering patients and their families to better 
       cope with physical, emotional, social, and spiritual concerns in the final stages of life. 
       Heritage Hospice, Inc. is a non-profit organization providing services to patients in their 
       homes and nursing facilities.</h4>
       <br/><br/>
       <img src={require('./better-care.jpg')}height={300} width={350} alt=""></img>
<img src={require('./count.jpg')}height={300} width={350} alt=""></img>
<img src={require('./preserve.jpg')}height={300} width={350} alt=""></img>
<br/>
       <Link to='/'>
            <button className="login-btn">Go Back</button>
        </Link>
    </div>
  );
};

export default AboutUs;
