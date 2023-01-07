import React, {useState, useEffect} from 'react'
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
  const [bC, setBC] = useState('');
  const navigate = useNavigate();

  const animatedComponents = makeAnimated();

    
  useEffect(() => {
    document.title = 'Individual';
  }, []);


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
    {value:'Kitchen', label:'Kitchen'}

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
      
      const getColor=(val)=>{
        if (val=='true') {
          setBC('green')
        }
        else{
          setBC('red')
        }
      }

return (
  <>
  <div className='filler'>
    
  </div>
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
        <td className='IVtd'> {el.preference=="NON-VEG"? <img src="https://user-images.githubusercontent.com/74299799/210125736-3e021162-9217-4f6c-9d61-f9aceaa6e468.svg" alt='NON-VEG' />:<img src="https://user-images.githubusercontent.com/74299799/210125735-9d1831f4-28e3-4a8a-885a-0493de559372.svg" alt='VEG' />} </td>
        {String(el.taken)=="true"? 
                <td className='IVtd'style={{backgroundColor: 'rgb(0, 200, 90)'}}><strong>Yes</strong></td>
                : 
        <td className='IVtd'style={{backgroundColor: 'rgb(255, 0, 60)'}}><strong>No</strong></td>
}
      </tr>

:''   }
</tbody>

))} 
      
    </table> 


 
  <button type="" onClick={Back}>Back</button>
</div>
</>
)
}

export default Individual