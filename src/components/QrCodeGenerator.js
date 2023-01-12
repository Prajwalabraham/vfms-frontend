import React from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import { useState, useEffect } from 'react'
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
  
  useEffect(() => {
    document.title = 'QR Generator';
  }, []);


  const [loading, setLoading] = useState(false);
	const [qr, setQr] = useState('')

	const GenerateQRCode = (e) => {
    e.preventDefault()
    console.log(value);
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
          setLoading(false)
          axios({
            method:'post',
            url: "https://vfms-emailserver.onrender.com/send" ,
            data: data
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        }
        // Create the email payload with the QR code image as an attachment
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

      setQr('')
  




    }
  }

  const handleShare = async(e)=>{
    const Authorization = "Bearer xxx"
    const type = 'image/png' // Image type (cannot be gif due to API restriction!)
    const baseUrl = "https://graph.facebook.com/v15.0/xxx" // Phone number of sender
    const recipient = "xxx" // Phone number of recipient
  
    /** This function creates a File object from an img element which has a base64 image */
    function fileFromImg(img) {
      var byteString = atob(img.src.split(',')[1]);
      var arrayBuffer = new ArrayBuffer(byteString.length);
      var arr = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteString.length; i++) {
        arr[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type });
      return new File([blob], "qr.png", { type })
    }
  
    /** This function will upload a File and call the given callback with the result */
    function sendFile(f, callback) {
      const url = baseUrl + "/media";
      const formData = new FormData()
      formData.append('file', f)
      formData.append('type', type)
      formData.append('messaging_product', "whatsapp")
  
      fetch(url, {
          method: 'POST',
          body: formData,
          headers: { Authorization }
      })
      .then(r => r.json())
      .then(callback)
      .catch(console.error)
    }
  
    /** This takes in a successful upload and sends that forward to receiver */
    function handleResponse(response) {
      // When it works response will look like {"id": "xxx"}
      fetch(baseUrl + "/messages", {
        method: 'POST',
        body: JSON.stringify({
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to": recipient,
          "type": "image",
          "image": response
        }),
        headers: { Authorization, "Content-Type": "application/json" }
      })
      .then(r => r.json())
      .then(r => console.log(r))
      .catch(console.error)
    }
  
    // I choose to trigger the sending when anything is clicked
    document.addEventListener("click", () => {
      const img = document.querySelector("img")
      const file = fileFromImg(img)
      sendFile(file, handleResponse)
    })

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
    <>
    <div className='login-box'>
    <h2>QR Code Generator</h2>
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
{success ? 
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
          
            <div className="user-box">
              <input name='name' id='name'  pattern="^(\w+)\s(\w+)$" value={state.name} onChange={handleChange} required />
              <label>Your Full Name</label>
            </div>
            <div className="user-box">
              <input name='phone' id='phone'  type='tel' pattern="(6|7|8|9)\d{9}$" value={state.phone} onChange={handleChange} required='true'/>
              <label>Your Phone</label>
            </div>
            <div className="user-box">
              <input name='email' id='mail'  type='email'  value={state.email} onChange={handleChange} required />
              <label>Your Email</label>
            </div>
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
        <a href={qr} download={`${state.name}.png`} ><button value="Download">Download</button></a>
			</>}
      
      {loading ?  <CircularProgress /> :
      <button onClick={handleSubmit}>Submit</button>}
        />
        <button type="" onClick={handleShare}>Share</button>
      <br/>       
    </div>
</>
  )
}

export default QrCodeGenerator