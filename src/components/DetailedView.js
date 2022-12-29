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
    const [fetched, setFetched] = useState(false);
  
    const navigate = useNavigate();

    const animatedComponents = makeAnimated();

    const teams = [
      {value:'Greeters', label:'Greeters'},
      {value:'Cleaning', label:'Cleaning'},
      {value:'Media', label:'Media'},
      {value:'Intercession', label:'Intercession'},
      {value:'Kids Church', label:'Kids Church'},
      {value:'Kitchen', label:'Kitchen'},

    ]
  

    const handleSelect = (e) => {
        setTeam(e.value)
      }
  
  
      const viewData = async(e) =>{
          setLoading(true)
          axios({
            method:'get',
            url: 'https://174.129.136.204/viewDetailedKitchen',
              headers: {
                "Content-type": "application/json"
              },
          }).then(response => {
            const result = response.data.rows;
            console.log(result);
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
                else{
                  console.log('Skipped');
                }
              });
            
              setData(filtered);
              console.log(filtered);
              console.log(data);
          })
          setLoading(false)
          setFetched(true)
          
      }
      
        const Back = (e) => {
          navigate('/Scan')
        }
           
        const Individual = (e) => {
          navigate('/Individual')
        }

  return (
    <div className='Llogin-box'>
    <br />
    <h2>More Details</h2>
    {fetched ? 
    <>
    <Select
              className='SelectTeam'
              closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti={false}
              options={teams}
              name='team'
              onChange={handleSelect}
            />
            <br/>
            </>

           : 
           <> {loading ? <CircularProgress /> : 
           <button type="" onClick={viewData}>Team</button>
       }
       </> 
       }
            {team && (
                 
    <table className='dvTable'>
      <thead className='DVthead'>
        <tr className='DVtr'>
        <th className='DVth'>Food</th>
          <th className='DVth'><img src="https://user-images.githubusercontent.com/74299799/209433785-40cc2619-acc3-41b2-adc6-c6cc09144c38.png" alt='NON-VEG' /></th>
          <th className='DVth'><img src="https://user-images.githubusercontent.com/74299799/209433786-f261fed6-427b-409a-96b5-6cf58deadef9.png" alt='VEG' /></th>
          <th className='DVth'>Total</th>
        </tr>
      </thead>
       <tbody>
    {data &&
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
}
</tbody>
      
    </table>
      )}
    <button type="" onClick={Individual} >Individual</button>
    <button type="" onClick={Back}>Back</button>
  </div>
  )
}

export default DetailedView