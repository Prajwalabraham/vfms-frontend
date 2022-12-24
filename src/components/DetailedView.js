import React, {useState} from 'react'
import './DetailedView.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function DetailedView() {
    
  const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState('');
  
    const navigate = useNavigate();

    const animatedComponents = makeAnimated();

    const teams = [
      {value:'Greeters', label:'Greeters'},
      {value:'Cleaning', label:'Cleaning'},
      {value:'Media', label:'Media'},
      {value:'Intercession', label:'Intercession'},
      {value:'Kids Church', label:'Kids Church'}
  
    
    ]
  

    const handleSelect = (e) => {
        setTeam(e.value)
      }
  
  
      const viewData = async(e) =>{
          setLoading(true)
          axios({
            method:'get',
            url: 'https://vfms-server.onrender.com/viewDetailedKitchen',
              headers: {
                "Content-type": "application/json"
              },
          }).then(response => {
            const result = response.data.rows;
            var arr = [];
            Object.keys(result).forEach(function(key) {
              arr.push(result[key]);
            });
            let filtered = {};
              teams.map(team=>{
                filtered[team.value] = {
                    nvCount: 0,
                    nvTaken: 0,
                    vCount: 0,
                    vTaken: 0,
                };
              });
              result.map(user => {
                if (user.preference.includes("NON-VEG")) {
                  filtered[user.team].nvCount += 1; 
                  if (user.taken === true) {
                    filtered[user.team].nvTaken += 1;
                  }
                } else if (user.preference.includes('VEG')) {
                  filtered[user.team].vCount += 1;
                  if (user.taken === true) {
                    filtered[user.team].vTaken += 1;
                  }
                }
              });
              setData(filtered);
          })
          setLoading(false)
      }
      
        const Back = (e) => {
          navigate('/Scan')
        }
           

  return (
    <div className='Llogin-box'>
    <br />
    <h2>Team Details</h2>
    <Select
              className='SelectTeam'
              closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti={false}
              options={teams}
              name='team'
              onChange={handleSelect}
            />
            <br />
    <table className='dvTable'>
      <thead className='DVthead'>
        <tr className='DVtr'>
        <th className='DVth'>Food</th>
          <th className='DVth'><img src="https://img.icons8.com/fluency/48/000000/non-vegetarian-food-symbol.png" alt='NON-VEG' /></th>
          <th className='DVth'><img src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png" alt='VEG' /></th>
          <th className='DVth'>Total</th>
        </tr>
      </thead>
       <tbody>
       {team && (
    <>
      <tr className='DVtr'><p>Ordered</p>
        <td className='DVtd'> {data[team].nvCount} </td>
        <td className='DVtd'> {data[team].vCount} </td>
        <td className='DVtd'> {data[team].nvCount + data[team].vCount} </td>
      </tr>
      <tr className='DVtr'><p>Recieved</p>
        <td className='DVtd'> {data[team].nvTaken} </td>
        <td className='DVtd'> {data[team].vTaken} </td>
        <td className='DVtd'> {data[team].nvTaken + data[team].vTaken} </td>
      </tr>
      <tr className='DVtr'><p>Remaining</p>
        <td className='DVtd'> {data[team].nvCount - data[team].nvTaken} </td>
        <td className='DVtd'> {data[team].vCount - data[team].vTaken} </td>
        <td className='DVtd'> {data[team].nvCount - data[team].nvTaken + data[team].vCount - data[team].vTaken} </td>
      </tr>
    </>
  )}
</tbody>
      
    </table>
    {loading ? <CircularProgress /> : 
    <button type="" onClick={viewData}>Refresh</button>
}
    <button type="" onClick={Back}>Scan</button>
  </div>
  )
}

export default DetailedView