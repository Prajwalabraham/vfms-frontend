import React from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './QrCodeGenerator.css'
import Select from 'react-select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import makeAnimated from 'react-select/animated';

function QrCodeGenerator() {
    const [state, setState] = useState({
        name:'',
        phone:'',
        email:''
    });
    const [team, setTeam] = useState('');
  const animatedComponents = makeAnimated();
  const [err, setErr] = useState(false);
  const [errMsg, seterrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const teams = [
    {value:'Greeters', label:'Greeters'},
    {value:'Cleaning', label:'Cleaning'},
    {value:'Media', label:'Media'},
    {value:'Intercession', label:'Intercession'},
    {value:'Kids Church', label:'Kids Church'},
    {value:'Kitchen', label:'Kitchen'},


  
  ]

  const [loading, setLoading] = useState(false);
	const [qr, setQr] = useState('')

	const GenerateQRCode = (e) => {
    e.preventDefault()

		QRCode.toDataURL(value, {
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, value) => {
			if (err) return console.error(err)

			console.log(value)
			setQr(value)
      console.log(data);
		})
    
	}


    function handleChange(event) {
        const res = event.target.value;
        setState({
            ...state,
            [event.target.name]: res
        })
    }

    const handleSelect = (e) => {
      setTeam(e.value)
      console.log(data);
    }
    const data = {
      state, team
    }
    const value = JSON.stringify(data)
    const handleSubmit = async(e) =>{
      e.preventDefault()
      if (team=='') {
        alert("Team is Required")
      }
      else{
      setLoading(true)
      const response = await axios({
        method:'post',
        url: "https://174.129.136.204/main_volunteers",
        data: data
      })
      .then(res => {
        console.log(res);
        if(res.status==201){
          setSuccess(true)
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status==406) {
          setErr(true)
          seterrMsg("The volunteer already exists!")
        }
        else{
          alert('There is an internal Server error. Kindly report to the IT team')
        }
      })
      setState({
        name:'',
        phone:'',
        email:''
      })
      setTeam('')
      setLoading(false)
    }
  }

const email = document.getElementById("mail");
if(email){
email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Email should be in format: example@example.com");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
});
}
const name = document.getElementById("name");
if(name){
name.addEventListener("input", (event) => {
  if (name.validity.patternMismatch) {
    name.setCustomValidity("Name should be in format: Jesus Christ");
    name.reportValidity();
  } else {
    name.setCustomValidity("");
  }
});
}

const phone = document.getElementById("phone");
if(phone){
phone.addEventListener("input", (event) => {
  if (phone.validity.patternMismatch) {
    phone.setCustomValidity("Phone should be of 10 digits");
    phone.reportValidity();
  } else {
    phone.setCustomValidity("");
  }
});
}

const handleError = (e) =>{
  setErr(false)
  seterrMsg('')
}
const handleSuccess = (e) =>{
  setSuccess(false)
}
      // download QR code
    
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
{success? 
  <div>
           <span><img src="https://user-images.githubusercontent.com/74299799/209782500-1ef43bd6-dadf-478c-b1e2-b89ecf05428d.png" alt={<CheckCircleOutlinedIcon sx={{ fontSize: 210 }}  style={{ color: "green" }} />} /></span>
           <br/>
           <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <strong>Successfully Submitted</strong>
            </Alert>
          </Stack>
           <button type="" onClick = {handleSuccess}>Back</button>

          </div>
: 
        <form onSubmit={GenerateQRCode}>
          <input name='name' id='name' placeholder='Full Name' pattern="^(\w\w+)\s(\w+)$" value={state.name} onChange={handleChange} required />
            <input name='phone' id='phone' placeholder='Phone' type='tel' pattern="(6|7|8|9)\d{9}$" value={state.phone} onChange={handleChange} required='true'/>
            <input name='email' id='mail' placeholder='Email' type='email'  value={state.email} onChange={handleChange} required />
              <br/>
            <Select
              className='SelectTeam'
              closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti={false}
              options={teams}
              name='team'
              onChange={handleSelect}
            />
      			<button type='submit' >Generate</button>
        </form>  
}     
        </>
}
        {qr && <>
				<img src={qr} alt='' />
        <a href={qr} download={`${state.name}.png`} ><button value="Download" >Download</button></a>
			</>}
      
      {loading ?  <CircularProgress /> :
      <button onClick={handleSubmit}>Submit</button>}
      <br/>       
    </div>

  )
}

export default QrCodeGenerator