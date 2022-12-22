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
          url: 'https://vfms-server.onrender.com/viewDetailedKitchen',
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
              },
              
              Media:{
                
                nvCount: 0,
                Taken: 0,
                vCount: 0,
              },
              KidsChurch:{
                
                nvCount: 0,
                Taken: 0,
                vCount: 0,
              },

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
            
            else if (el.team.includes('Media')) {
              if (el.preference.includes('NON-VEG')) {
                filtered.Media.nvCount++;
            }
            else if (el.preference.includes('VEG')) {
              filtered.Media.vCount++;
            }
            if (el.taken===true ) {
              filtered.Media.Taken++;
            }
            }
            else if (el.team.includes('Kids Church')) {
              if (el.preference.includes('NON-VEG')) {
                filtered.KidsChurch.nvCount++;
            }
            else if (el.preference.includes('VEG')) {
              filtered.KidsChurch.vCount++;
            }
            if (el.taken===true ) {
              filtered.KidsChurch.Taken++;
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
    <div className='box'>
      <br />
      <h2>Team Details</h2>
      <table className='dvTable'>
        <thead className='DVthead'>
          <tr className='DVtr'>
            <th className='DVth'>Team</th>
            <th className='DVth'>NON-VEG</th>
            <th className='DVth'>VEG</th>
            <th className='DVth'>Ordered</th>
            <th className='DVth'>Recieved</th>
            <th className='DVth'>Remaining</th>
          </tr>
        </thead>
          
        {data&&
        
        <tbody className='DVtbody'>
          <tr className='DVtr'>
            <td className='DVtd'>Greeters</td>
            <td className='DVtd'>{data.Greeters.nvCount}</td>
            <td className='DVtd'>{data.Greeters.vCount}</td>
            <td className='DVtd'>{data.Greeters.nvCount + data.Greeters.vCount}</td>
            <td className='DVtd'>{data.Greeters.Taken}</td>
            <td className='DVtd'>{data.Greeters.nvCount + data.Greeters.vCount - data.Greeters.Taken}</td>
          </tr>
          <tr className='DVtr'>
          <td className='DVtd'>Cleaning</td>
          <td className='DVtd'>{data.Cleaning.nvCount}</td>
          <td className='DVtd'>{data.Cleaning.vCount}</td>
          <td className='DVtd'>{data.Cleaning.nvCount + data.Cleaning.vCount}</td>
          <td className='DVtd'>{data.Cleaning.Taken}</td>
          <td className='DVtd'>{data.Cleaning.nvCount + data.Cleaning.vCount - data.Cleaning.Taken}</td>
        </tr>
          <tr className='DVtr'>
          <td className='DVtd'>Intercession</td>
          <td className='DVtd'>{data.Intercession.nvCount}</td>
          <td className='DVtd'>{data.Intercession.vCount}</td>
          <td className='DVtd'>{data.Intercession.nvCount + data.Intercession.vCount}</td>
          <td className='DVtd'>{data.Intercession.Taken}</td>
          <td className='DVtd'>{data.Intercession.nvCount + data.Intercession.vCount - data.Intercession.Taken}</td>
        </tr>
        <tr className='DVtr'>
          <td className='DVtd'>Media</td>
          <td className='DVtd'>{data.Media.nvCount}</td>
          <td className='DVtd'>{data.Media.vCount}</td>
          <td className='DVtd'>{data.Media.nvCount + data.Media.vCount}</td>
          <td className='DVtd'>{data.Media.Taken}</td>
          <td className='DVtd'>{data.Media.nvCount + data.Media.vCount - data.Media.Taken}</td>
        </tr>
        <tr className='DVtr'>
          <td className='DVtd'>Kids Church</td>
          <td className='DVtd'>{data.KidsChurch.nvCount}</td>
          <td className='DVtd'>{data.KidsChurch.vCount}</td>
          <td className='DVtd'>{data.KidsChurch.nvCount + data.KidsChurch.vCount}</td>
          <td className='DVtd'>{data.KidsChurch.Taken}</td>
          <td className='DVtd'>{data.KidsChurch.nvCount + data.KidsChurch.vCount - data.KidsChurch.Taken}</td>
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