import React from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './QrCodeGenerator.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function QrCodeGenerator() {
    const [state, setState] = useState({
        name:'',
        phone:'',
        email:''
    });
    const [team, setTeam] = useState('');
  const animatedComponents = makeAnimated();

  const teams = [
    {value:'Greeters', label:'Greeters'},
    {value:'Cleaning', label:'Cleaning'},
    {value:'Media', label:'Media'},
    {value:'Intercession', label:'Intercession'},
    {value:'Kids Church', label:'Kids Church'}

  
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
      setLoading(true)
      const response = await axios({
        method:'post',
        url: "https://vfms-server.onrender.com/main_volunteers",
        data: data
      })
      .then(res => {
        console.log(res);
        if(res.status==201){
          alert('Volunteer Successfully Created')
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status==406) {
          alert("The volunteer already exists!");
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
    
      // download QR code
    
  return (
    <div className='login-box'>
        <form onSubmit={GenerateQRCode}>
          <input name='name'  placeholder='Full Name' value={state.name} onChange={handleChange} required />
            <input name='phone'  placeholder='Phone' type='tel' pattern="(6|7|8|9)\d{9}$" value={state.phone} onChange={handleChange} required='true'/>
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