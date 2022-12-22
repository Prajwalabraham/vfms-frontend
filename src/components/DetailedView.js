import React, {useState} from 'react'
import './DetailedView.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

function DetailedView() {
    
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


    const viewData = async(e) =>{
        setLoading(true)
        axios({
          method:'get',
          url: 'https://vfms-server.onender.com/viewDetailedKitchen',
            headers: {
              "Content-type": "application/json"
            },
        }).then(response => {
          console.log(response);
          const result = response.data.rows;
          var arr = [];
          Object.keys(result).forEach(function(key) {
            arr.push(result[key]);
          });
          console.log(arr);

          const filtered = {
              Greeters: 
                { 
                  nvCount: 0,
                  Taken: 0,
                  vCount: 0
                },
              Cleaning:{
                nvCount: 0,
                Taken: 0,
                vCount: 0,
                
              },
              Intercession:{
                
                nvCount: 0,
                Taken: 0,
                vCount: 0,
              }
              
          };
          arr.map((el, i) => {
            if (el.team.includes('Greeters')) {
              if (el.preference.includes('NON-VEG')) {
                filtered.Greeters.nvCount++;
            }
            else if (el.preference.includes('VEG')) {
              filtered.Greeters.vCount++;
            }
            if (el.taken===true ) {
              filtered.Greeters.Taken++;
            }
            
            }
            else if (el.team.includes('Cleaning')) {
              if (el.preference.includes('NON-VEG')) {
                filtered.Cleaning.nvCount++;
            }
            else if (el.preference.includes('VEG')) {
              filtered.Cleaning.vCount++;
            }
            if (el.taken===true ) {
              filtered.Cleaning.Taken++;
            }
            
            }
            else if (el.team.includes('Intercession')) {
              if (el.preference.includes('NON-VEG')) {
                filtered.Intercession.nvCount++;
            }
            else if (el.preference.includes('VEG')) {
              filtered.Intercession.vCount++;
            }
            if (el.taken===true ) {
              filtered.Intercession.Taken++;
            }
            }
            
        });
        console.log(filtered);
        setData(filtered)
        
        console.log(data);
        })
        setLoading(false)
    }
    
      const Back = (e) => {
        navigate('/Scan')
      }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>NON-VEG</th>
            <th>VEG</th>
            <th>Ordered</th>
            <th>Recieved</th>
            <th>Remaining</th>
          </tr>
        </thead>
          
        {data&&
        
        <tbody>
          <tr>
            <td>Greeters</td>
            <td>{data.Greeters.nvCount}</td>
            <td>{data.Greeters.vCount}</td>
            <td>{data.Greeters.nvCount + data.Greeters.vCount}</td>
            <td>{data.Greeters.Taken}</td>
            <td>{data.Greeters.nvCount + data.Greeters.vCount - data.Greeters.Taken}</td>
          </tr>
          <tr>
          <td>Cleaning</td>
          <td>{data.Cleaning.nvCount}</td>
          <td>{data.Cleaning.vCount}</td>
          <td>{data.Cleaning.nvCount + data.Cleaning.vCount}</td>
          <td>{data.Cleaning.Taken}</td>
          <td>{data.Cleaning.nvCount + data.Cleaning.vCount - data.Cleaning.Taken}</td>
        </tr>
          <tr>
          <td>Greeters</td>
          <td>{data.Intercession.nvCount}</td>
          <td>{data.Intercession.vCount}</td>
          <td>{data.Intercession.nvCount + data.Intercession.vCount}</td>
          <td>{data.Intercession.Taken}</td>
          <td>{data.Intercession.nvCount + data.Intercession.vCount - data.Intercession.Taken}</td>
        </tr>
        </tbody>
}
        
      </table>
      {loading ? <CircularProgress /> : 
      <button type="" onClick={viewData}>Refresh</button>
}
      <button type="" onClick={Back}>Scan</button>
    </div>
  )
}

export default DetailedView