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
        <ThumbUpAltRoundedIcon sx={{ fontSize: 260 }} color="primary"  />
        <h2>Successfully Verified</h2>
    <br/>
        <table className='Table'>
        <tbody className='Table-body' >
          <tr className='Table-row'><p>Name</p>
          <td className='Table-data' >{location.state.name}</td>
          </tr>
          <tr><p>Team</p>
          <td className='Table-data'>{location.state.team}</td>
          </tr>
          <tr><p>Preference</p>
          <td className='Table-data'>{location.state.preference}</td>
          </tr>
        </tbody>
      </table>
        <button onClick={handleClick}>Back</button>
    </div>
  )
}

export default Success