import React, {useState} from 'react';
import './View.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';


function View() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  const teams = [
    {value:'Greeters', label:'Greeters'},
    {value:'Cleaning', label:'Cleaning'},
    {value:'Media', label:'Media'},
    {value:'Intercession', label:'Intercession'},
    {value:'Kids Church', label:'Kids Church'}

  
  ]

  const viewData = async(e) =>{
    setLoading(true)
    const result = await axios({
      method:'post',
      url: 'https://vfms-server.onrender.com/viewKitchen',
    }).then(response => {
      const result = response.data.rows;
            let filtered = {};
              
                filtered = {
                    nvCount: 0,
                    nvTaken: 0,
                    vCount: 0,
                    vTaken: 0,
                };
        
              result.map(user => {
                if (user.preference.includes("NON-VEG")) {
                  filtered.nvCount += 1; 
                  if (user.taken === true) {
                    filtered.nvTaken += 1;
                  }
                } else if (user.preference.includes('VEG')) {
                  filtered.vCount += 1;
                  if (user.taken === true) {
                    filtered.vTaken += 1;
                  }
                }
                else{
                  throw console.error('something is not right');
                }
              });
              setData(filtered);
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
    <div className='Llogin-box'>
      <table className='viewTable'>
        <thead className='viewThead'>
          <tr className='viewTr'>
            <th className='viewTh'>
              Food
            </th>
            <th className='viewTh'><img src="https://img.icons8.com/fluency/48/000000/non-vegetarian-food-symbol.png" alt='NON-VEG' /></th>
            <th className='viewTh'><img src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png" alt='VEG' /></th>
          </tr>
        </thead>
        <tbody className='viewTbody'>
          <tr className='viewTr'><p>Ordered</p>
          <td className='viewTd'>{data.nvCount}</td>
          <td className='viewTd'>{data.vCount}</td>
          </tr>
          
          <tr className='viewTr'><p>Recieved</p>
          <td className='viewTd'>{data.nvTaken}</td>
          <td className='viewTd'>{data.vTaken}</td>
          </tr>
          
          <tr className='viewTr'><p>Remaining</p>
          <td className='viewTd'>{data.nvCount - data.nvTaken}</td>
          <td className='viewTd'>{data.vCount - data.vTaken}</td>
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