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
    .catch(error => {
      console.log(error);
      /*if(error.response.status == 400){
        alert("Volunteer has not applied for coupon this week.")
      }
      else{

        alert("Internal server error. Kindly report to the IT team")
      }*/
    })
    setLoading(false)
}

  const Back = (e) => {
    
    navigate('/Scan')
  }
  const moreDetails = (e) => {
    navigate('/DV')
  }


  return (
    <div className='login-box'>
      <table className='viewTable'>
        <thead className='viewThead'>
          <tr className='viewTr'>
            <th className='viewTh'>
              Total
            </th>
            <th className='viewTh'>Ordered</th>
            <th className='viewTh'>Recieved</th>
          </tr>
        </thead>
        <tbody className='viewTbody'>
          <tr className='viewTr'><p>Non-Veg</p>
          <td className='viewTd'>{data.nonVegCount}</td>
          <td className='viewTd'>{data.recNonVeg}</td>
          </tr>
          
          <tr className='viewTr'><p>Veg</p>
          <td className='viewTd'>{data.vegCount}</td>
          <td className='viewTd'>{data.recVeg}</td>
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