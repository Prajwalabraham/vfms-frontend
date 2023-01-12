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
        <span><img src="https://user-images.githubusercontent.com/74299799/212174581-7171d060-81c9-4359-b617-ec91e017463c.png" alt="" style={{borderRadius: '50%'}}/></span>
        <br/>
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
          <td className='Ttd'>{location.state.preference=="NON-VEG"? <img src="https://user-images.githubusercontent.com/74299799/210125736-3e021162-9217-4f6c-9d61-f9aceaa6e468.svg" alt='NON-VEG' style={{width: '30%', background: "white", borderRadius: "0", padding: "5%" }} /> : <img src="https://user-images.githubusercontent.com/74299799/210125735-9d1831f4-28e3-4a8a-885a-0493de559372.svg" alt='VEG' style={{width: '30%', background: "white", borderRadius: "0", padding: "5%" }} />}</td>
          </tr>
        </tbody>
      </table>
        <button onClick={handleClick}>Back</button>
    </div>
  )
}

export default Success