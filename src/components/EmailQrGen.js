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
import {InlineShareButtons} from 'sharethis-reactjs';


function EmailQrGen() {
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
const [WhatsappUrl, setWhatsappUrl] = useState('');
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
  {value:'Kitchen', label:'Kitchen'},
  {value:'Worship-Band', label:'Worship Band'},
  {value:'Worship-Choir', label:'Worship Choir'},
]
  



  const [loading, setLoading] = useState(false);
	const [qr, setQr] = useState('')

	const GenerateQRCode = (e) => {
    e.preventDefault()

    QRCode.toDataURL(value, {
			margin: 2,
			color: {
				dark: '#000000',
				light: '#ffffff'
			},
      width: 2000,
      height:2000
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
      state, team, qr
    }

    
    const value = JSON.stringify(data)
    const handleSubmit = async(e) =>{
      e.preventDefault()
      
      setLoading(true)
      
        console.log(data);
          setSuccess(true)
          setLoading(false)
          axios({
            method:'post',
            url: "https://vfms-emailserver.onrender.com/send" ,
            data: data
          }).then(res => {
            console.log(res);
            setSuccess(true)
          }).catch(err => {
            console.log(err);
            setErr(true)
            seterrMsg(err.response)
          })
        
        // Create the email payload with the QR code image as an attachment
      setState({
        name:'',
        phone:'',
        email:''
      })
      setTeam('')
      setLoading(false)

      setQr('')

    
  }

  const handleShare = async(e)=>{
    /*
    const file = new Blob([qr], {type: "image/png"})
    console.log(file);
    const data = {
      files: [
        new File([file], 'image.png', {
          type: file.type,
        }),
      ],
      title: 'QRCode',
      text: 'YourQRCode',
    };
    const fileUrl = URL.createObjectURL(file)
    setWhatsappUrl(fileUrl)
    console.log(fileUrl);
    console.log(file);
    if(navigator.share) {
      await navigator.share({
        title: "title",
        text: "your text",
        url: fileUrl,
        files: [data]     
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error in sharing', error));
    }else {
      console.log(`system does not support sharing files.`);
    }
    
*/
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
  setState({
    
    name:'',
    phone:'',
    email:''
  })
  setTeam('')
  setQr('')

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
          <input name='name' id='name' placeholder='Full Name' pattern="^(\w+)\s(\w+)$" value={state.name} onChange={handleChange} required />
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
				<img src={qr} alt='' className='qrimg' id='can'/>
        <a href={qr} download={`${state.name}.png`} ><button value="Download" >Download</button></a>
			</>}
      
      {loading ?  <CircularProgress /> :
      <button onClick={handleSubmit}>Submit</button>}
        />
      <br/>       
    </div>

  )
}

export default EmailQrGen