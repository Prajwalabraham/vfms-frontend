import React from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './QrCodeGenerator.css'

function QrCodeGenerator() {
    const [state, setState] = useState({
        name:'',
        phone:'',
        email:'',
        team:''
    });
  const [loading, setLoading] = useState(false);

	const [qr, setQr] = useState('')

	const GenerateQRCode = (e) => {
    e.preventDefault()
		QRCode.toDataURL(value, {
      width:200,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, value) => {
			if (err) return console.error(err)

			console.log(value)
			setQr(value)
		})
	}


    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }

    const value = JSON.stringify(state)
    const handleSubmit = async(e) =>{
      e.preventDefault()
      if (state.name == '' && state.phone == '' && state.email == '') {
        alert("All Inputs are Required!!!")
      }
      else if (state.name == '') {
        alert("Name is Required!")
      } else if (state.phone=='') {
        alert("Phone is Required!")
      }
      else if (state.preference == '') {
        alert("Phone is Required!")
      }
      else{
      setLoading(true)
      const response = await axios({
        method:'post',
        url: "https://vfms-server.onrender.com/main_volunteers",
        data: state
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
    }
      setState({
        name:'',
        phone:'',
        email:'',
        team:''
      })
      setLoading(false)
    }

    
      // download QR code
    
  return (
    <div className='login-box'>
        <form>
            <input name='name'  placeholder='Name' value={state.name} onChange={handleChange} />            
            <input name='phone'  placeholder='Phone' value={state.phone} onChange={handleChange} />
            <input name='email' placeholder='Email' value={state.email} onChange={handleChange} />
            <input name='team' placeholder='Team' value={state.team} onChange={handleChange} />
      			<button onClick={GenerateQRCode}>Generate</button>
        </form>       
        {qr && <>
				<img src={qr} alt='' />
        <a href={qr} download="qrcode.png" ><button value="Download" >Download</button></a>
			</>}
      
      {loading ?  <CircularProgress /> :
      <button onClick={handleSubmit}>Submit</button>}
        
    </div>
  )
}

export default QrCodeGenerator