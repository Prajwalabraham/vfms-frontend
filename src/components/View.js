import React, {useState, useEffect} from 'react';
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
    {value:'Kids-Church', label:'Kids Church'},
    {value:'Chair-Arrangement', label:'Chair Arrangement '},
    {value:'Ground-Maintenance', label:'Ground Maintenance '},
    {value:'Holy-Communion', label:'Holy Communion'},
    {value:'New-Comers ', label:'New Comers '},
    {value:'Offering', label:'Offering'},
    {value:'Resource-Center', label:'Resource Center'},
    {value:'Parking', label:'Parking'},
    {value:'Projection', label:'Projection'},
    {value:'Sound', label:'Sound'},
    {value:'Kitchen', label:'Kitchen'},
    {value:'Worship-Band', label:'Worship Band'},
    {value:'Worship-Choir', label:'Worship Choir'},
  ]
  
  useEffect(() => {
    document.title = 'View';
  }, []);


  useEffect(() => {
    const result =  axios({
      method:'post',
      url: 'https://174.129.136.204/viewKitchen',
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
  }, []);


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
            <th className='viewTh'><img src="https://user-images.githubusercontent.com/74299799/210125736-3e021162-9217-4f6c-9d61-f9aceaa6e468.svg" alt='NON-VEG' className='Vimg' /></th>
            <th className='viewTh'><img src="https://user-images.githubusercontent.com/74299799/210125735-9d1831f4-28e3-4a8a-885a-0493de559372.svg" alt='VEG' className='Vimg' /></th>
            <th className='viewTh' >Total</th>
          </tr>
        </thead>
        <tbody className='viewTbody'>
          <tr className='viewTr'><p>Ordered</p>
          <td className='viewTd'>{data.nvCount}</td>
          <td className='viewTd'>{data.vCount}</td>
          <td className='viewTd'>{data.vCount+data.nvCount}</td>
          </tr>
          
          <tr className='viewTr'><p>Recieved</p>
          <td className='viewTd'>{data.nvTaken}</td>
          <td className='viewTd'>{data.vTaken}</td>
          <td className='viewTd'>{data.vTaken+data.nvTaken}</td>
          </tr>
          
          <tr className='viewTr'><p>Remaining</p>
          <td className='viewTd'>{data.nvCount - data.nvTaken}</td>
          <td className='viewTd'>{data.vCount - data.vTaken}</td>
          <td className='viewTd'>{(data.vCount - data.vTaken)+ (data.nvCount - data.nvTaken)}</td>
          </tr>
        </tbody>
      </table>
      <br />
  
  <button onClick={Back} >Back</button>
  <button onClick={moreDetails}>More Details</button>
    </div>
  )
}

export default View