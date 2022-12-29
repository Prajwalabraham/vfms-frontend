import React, {useState} from 'react'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function Phone() {
    const [state, setState] = useState({
        phone: ''
    });

    const [isverifying, setisverifying] = useState(false);    
    const [err, setErr] = useState(false);
    const [errMsg, seterrMsg] = useState('');

    const navigate = useNavigate()
    function handleChange(event) {
        const res = event.target.value;
        setState({
            ...state,
            [event.target.name]: res
        })
    }


    const handleSubmit =async(e)=>{
    setisverifying(true)
    console.log(state);

    const response = await axios({
      method:'post',
      url: 'https://174.129.136.204/verify',
      data: state
  }).then(res => {
    console.log(res);
    if (res.status == 201) {
      navigate('/Success', {
        state:{
          name:res.data.resName,
          taken:res.data.resTaken,
          preference:res.data.resPreference,
          team:res.data.resTeam,
        }
      })
    }
    else{
      alert("There is an internal Server error. Kindly report to the IT team")
    }
  }).catch(err => {
    console.log(err);
    if (err.response.status == 400) {
      setErr(true)
      seterrMsg("Volunteer has not applied for coupons this week")
    }
    else if (err.response.status == 401) {
      setErr(true)
      seterrMsg("The Volunteer has already taken food")
    }
    else{
      setErr(true)
      seterrMsg("There is an internal Server error. Kindly report to the IT team")
     
    }
  })
  setisverifying(false)
    }

const handleError=(e)=>{
    navigate('/Scan')
}

  return (
    <div className='login-box'>
        {err ? 
  <div>
       <span><img src="https://user-images.githubusercontent.com/74299799/209782507-c470b66c-4666-481a-a187-01ddc9992625.png" alt={<ErrorOutlineOutlinedIcon sx={{ fontSize: 210 }}  style={{ color: "red" }} />} /></span>
       <br/>
       <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errMsg}
        </Alert>
      </Stack>
       <button type="" onClick = {handleError}>Back</button>

      </div>
: 
<>
        <form onSubmit={handleSubmit}>
            <input name='phone' id='phone' placeholder='Phone' type='tel' pattern="(6|7|8|9)\d{9}$" value={state.phone} onChange={handleChange} required={true}/>
            
        {isverifying?
        <CircularProgress /> : ''}
        <button type="submit">Verify</button>
        
        </form>
</>
}
    </div>
  )
}

export default Phone