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
        <h2>Successfully Verified</h2>
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
          <td className='Ttd'>{location.state.preference}</td>
          </tr>
        </tbody>
      </table>
        <button onClick={handleClick}>Back</button>
    </div>
  )
}

export default Success