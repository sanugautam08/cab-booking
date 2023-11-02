import React, { useState} from 'react';
import axios from 'axios';

function Home() {
  
  const [availableCabs, setAvailableCabs] = useState([]);
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [bookingSuccess,setBookingSuccess] = useState([]);
  const [cabbuttonClicked, setcabButtonClicked] = useState(false);
  const [formData, setFormData] = useState({
    user_email: '',
    source: '',
    destination: '',
  });

  const [formErrors, setFormErrors] = useState({
    user_email: '',
    source: '',
    destination: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Basic validation: Check if the input field is empty
    if (value.trim() === '') {
      setFormErrors({
        ...formErrors,
        [name]: 'This field is required.',
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };



 

  const handleSubmit = async(e) => {
    
    e.preventDefault();

    // Basic validation: Check if email, source, and destination are not empty
    if (formData.user_email.trim() === '') {
      setFormErrors({
        ...formErrors,
        user_email: 'This field is required.',
      });
    }
    if (formData.source.trim() === '') {
      setFormErrors({
        ...formErrors,
        source: 'This field is required.',
      });
    }
    if (formData.destination.trim() === '') {
      setFormErrors({
        ...formErrors,
        destination: 'This field is required.',
      });
    }

    // If there are no errors, send a POST request
    if (
      formData.user_email.trim() !== '' &&
      formData.source.trim() !== '' &&
      formData.destination.trim() !== ''
    ) {
      try {
        
        const postResponse = await fetch('http://localhost:8000/api/cabbooking/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (postResponse.ok) {
          // Reset the form
          //setPostData(postResponse.data);
          setFormData({
            user_email: '',
            source: '',
            destination: '',
          });
          setFormErrors({
            user_email: '',
            source: '',
            destination: '',
          });

          console.log('Form submitted successfully');
          
        } else {
          console.error('Error:', postResponse.status, postResponse.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
     try {
        const postResponses = await axios.get(`http://localhost:8000/api/calculate_time/${formData.source}/${formData.destination}/`); // Replace with your actual API endpoint
        
        setPostData(postResponses.data);
        // Reset the form
        //console.log(postResponses.data);
      } catch (error) {
        console.error('Error:', error);
      }
      try{
 
        const getResponse = await axios.get('http://localhost:8000/api/cabs/');
          setAvailableCabs(getResponse.data);
          setButtonClicked(true);      
  
      } catch(error){
        setError('An error occurred while fetching available cabs.');
      }
      
    }
  };
 
  
  function bookCab(cabId,minutes)
  {
    axios.get(`http://localhost:8000/api/set-unavailable/${cabId}/${minutes}/`)
        .then(response => {
            console.log('Cab availability updated:', response.data.message);
            setBookingSuccess('Booking Successful')
            setcabButtonClicked(true)
          
            // Add any additional logic you need after booking the cab
        })
        .catch(error => {
            console.error('Error updating cab availability:', error);
        });
  }
      
  
  const filteredCabs = availableCabs.filter((cab) => cab.availability === true);


  return (
    <div>
            <div className="container">
              <h1 className="mt-5 text-center" >Cab Finder</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Email:</label>
         <input
            type="email"
            className="form-control"
            name="user_email"
            placeholder='Email'
            value={formData.user_email}
            onChange={handleChange}
          />
          <span className="text-danger">{formErrors.email}</span>
        </div>
        <div className="form-group">
          <label>Select Source:</label>
          <select value={formData.source} className="form-control" name="source" onChange={handleChange}>
            <option value="">Source</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
      </select>
        
          <span className="text-danger">{formErrors.source}</span>
        </div>
        <div className="form-group">
          <label>Select Destination:</label>
          <select value={formData.destination} className="form-control" name="destination" onChange={handleChange}>
            <option value="">Destination</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
      </select>

          
          <span className="text-danger">{formErrors.destination}</span>
        </div><br></br>
        <button type="submit" className="btn btn-primary text-center">
          Check Cab Availability
        </button>
      </form>
    </div>  
         
      {error && <h4 className="text-center">{error}</h4>}
      {buttonClicked && filteredCabs.length>0 ? (
          <div>
            <h2 className="text-center"> Displaying Currently Available Cabs </h2>
            <div  className='table-responsive{-sm|-md|-lg|-xl}'>
              <table className="table table-striped table-hover table-dark">
                <thead>
                   <tr>
                       <th scope="col">Cab Names</th>
                       <th scope="col">Price Per Minute</th> 
                       <th scope="col">Shortest Time</th>
                       <th scope="col">Estimated Cost</th>
                       <th scope="col">Make Booking</th>
                   </tr>
               </thead>
                <tbody >
                     {filteredCabs.map((cab, i) => (
                         <tr key={i}>
                           <th scope="row">{cab.name}</th>
                           <td>{cab.price}</td>
                           <td>{postData.time}</td>
                           <td>{cab.price*postData.time}</td>
                           <td><button className="btn btn-primary" id={`bookButton-${cab.id}`} onClick={() => bookCab(cab.id,postData.time)}>Book</button></td>
                           
                        </tr>
                      ))}
               </tbody>
              </table>
            </div>
          </div>
      ) : (
        buttonClicked && filteredCabs.length === 0 && !error && <h4 className='text-center'>No Available Cabs</h4>
      )}
      {cabbuttonClicked && bookingSuccess.length>0 ? <h2 className='text-center'>{bookingSuccess}</h2>:<p></p>}
        
    </div>
  );
}

export default Home;
