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
  const [fetched, setFetched] = useState(false);

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
          url: 'http://ec2-3-85-163-206.compute-1.amazonaws.com:4000/viewDetailedKitchen',
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
        setFetched(true)
    }
    
      const Back = (e) => {
        navigate('/View')
      }
         

return (
  <div className='Ilogin-box'>
  <br />
  <h2>Team Details</h2>
{fetched?
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
          </>:
          <>
           {loading ? <CircularProgress /> : 
  <button type="" onClick={viewData}>Refresh</button>
}
</>}
  
          <table className='IvTable'>
      {fetched?
      <thead className='IVthead'>
        <tr className='IVtr'>
        <th className='IVth'>Name</th>
          <th className='IVth'>Team</th>
          <th className='IVth'>Choice</th>
          <th className='IVth'>Taken</th>
        </tr>
      </thead>
      :''}
      
      {data?.map((el, index) => (
          <tbody>
        {el.team==team ?
       
        <tr className='IVtr' key={index}>
        <td className='IVtd'> {el.name} </td>
        <td className='IVttd'> {el.team} </td>
        <td className='IVtd'> {el.preference=="NON-VEG"? <img src="https://img.icons8.com/fluency/48/000000/non-vegetarian-food-symbol.png" alt='NON-VEG' />:<img src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png" alt='VEG' />} </td>
        <td className='IVtd'> {String(el.taken)} </td>
      </tr>



:''   }
</tbody>

))} 
      
    </table> 


 
  <button type="" onClick={Back}>Back</button>
</div>
)
}

export default Individual