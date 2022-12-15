import React, {useState} from 'react';
import './View.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';


function View() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const viewData = async(e) =>{
    setLoading(true)
    const result = await axios({
      method:'post',
      url: 'https://vfms-server.onrender.com/viewKitchen',
    }).then(response => {
      setData(response.data);
      console.log(data);  
    })
    setLoading(false)
}

  const Back = (e) => {
    
    navigate('/Scan')
  }
  const moreDetails = (e) => {
    navigate('/DetailedView')
  }


  return (
    <div className='login-box'>
      <table>
        <thead>
          <tr>
            <th>
              Total
            </th>
            <th>Ordered</th>
            <th>Recieved</th>
          </tr>
        </thead>
        <tbody>
          <tr><p>Non-Veg</p>
          <td>{data.nonVegCount}</td>
          <td>{data.recNonVeg}</td>
          </tr>
          
          <tr><p>Veg</p>
          <td>{data.vegCount}</td>
          <td>{data.recVeg}</td>
          </tr>
          
        </tbody>
      </table>
      <br />
      {loading ?  <CircularProgress /> :
      <button onClick={viewData}>Refresh</button>
  }
  
  <button onClick={Back} >Back</button>
  <button onClick={moreDetails}>More Details</button>
    </div>
  )
}

export default View