import React, {useState} from 'react'
import './DetailedView.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Select from 'react-select';
import ReactTable from 'react-table';
import makeAnimated from 'react-select/animated';

function Individual() {

       
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
          console.log(result);
          setData(result)
          console.log(data);

          console.log(data?.map(el => el.team));
        })
        setLoading(false)
    }
    
      const Back = (e) => {
        navigate('/View')
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
        <th className='DVth'>Name</th>
          <th className='DVth'>Team</th>
          <th className='DVth'>Preference</th>
          <th className='DVth'>Taken</th>
        </tr>
      </thead>
      
      {data?.map((el => {
          <>
          {el.team==team?
       <tbody>
        <tr className='DVtr' >
        <td className='DVtd'> {data.name} </td>
        <td className='DVtd'> {data.team} </td>
        <td className='DVtd'> {data.preference} </td>
        <td className='DVtd'> {data.taken} </td>
      </tr>

</tbody>

:''   }
</>

}))      
} 
      
    </table> 


  {loading ? <CircularProgress /> : 
  <button type="" onClick={viewData}>Refresh</button>
}
  <button type="" onClick={Back}>Back</button>
</div>
)
}

export default Individual