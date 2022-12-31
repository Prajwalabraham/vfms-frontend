import React from 'react'
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

function Success() {
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = (e) => {
    navigate('/Scan')
  }
  
  
  return (
    <div className='login-box'>
        <span><ThumbUpAltRoundedIcon sx={{ fontSize: 210 }} style={{ color: "green" }}  /></span>
        <h2>Successfully Taken</h2>
    <br/>
        <table className='tTable'>
        <tbody className='Ttbody' >
          <tr className='Ttr'><p>Name</p>
          <td className='Ttd' >{location.state.name}</td>
          </tr>
          <tr className='Ttr' ><p>Team</p>
          <td className='Ttd'>{location.state.team}</td>
          </tr>
          <tr className='Ttr'><p>Preference</p>
          <td className='Ttd'>{location.state.preference=="NON-VEG"? <img src="https://img.icons8.com/fluency/48/000000/non-vegetarian-food-symbol.png" alt='NON-VEG' className='qrimg' /> : <img src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png" alt='VEG' className='qrimg' />}</td>
          </tr>
        </tbody>
      </table>
        <button onClick={handleClick}>Back</button>
    </div>
  )
}

export default Success