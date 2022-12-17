import React from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './QrCodeGenerator.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function QrCodeGenerator() {
    const [state, setState] = useState({
        name:'',
        phone:'',
        email:'',
        team:''
    });

    
  const animatedComponents = makeAnimated();

  const teams = [
    {value:'Greeters', label:'Greeters'},
    {value:'Cleaning', label:'Cleaning'},
    {value:'Media', label:'Media'},
    {value:'Intercession', label:'Intercession'},
    {value:'Kids Church', label:'Kids Church'}

  
  ]

  const [loading, setLoading] = useState(false);
  const [requiredName, setRequiredName] = useState(true);
  const [requiredPhone, setRequiredPhone] = useState(true);
  const [requiredEmail, setRequiredEmail] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
	const [qr, setQr] = useState('')

	const GenerateQRCode = (e) => {
    e.preventDefault()
    if (state.name == '' && state.phone == '' && state.email == '') {
      setRequiredName(false)
      setRequiredPhone(false)
      setRequiredEmail(false)
    }
    else if (state.name == '') {
      setRequiredName(false)
    } else if (state.phone=='') {
      setRequiredPhone(false)
    }
    else if (state.email == '') {
      setRequiredEmail(false)
    }
    else{
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
      console.log(state);
		})
    
    setRequiredName(true)
    setRequiredPhone(true)
    setRequiredEmail(true)
  }
	}


    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
        setRequiredName(true)
        setRequiredPhone(true)
        setRequiredEmail(true)
    }

    const handleSelect = (e) => {
      setState({team:e.value})
    }

    const value = JSON.stringify(state)
    const handleSubmit = async(e) =>{
      e.preventDefault()
      /*if (state.name == '' && state.phone == '' && state.email == '' && state.team=='') {
        alert("All Inputs are Required!!!")
      }
      else if (state.name == '') {
        alert("Name is Required!")
      } else if (state.phone=='') {
        alert("Phone is Required!")
      }
      else if (state.preference == '') {
        alert("Phone is Required!")
      }*/
      //else{
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
   // }
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
          {requiredName ? '' : 
           <Stack className='Stack'  spacing={2}>
           <Alert severity='warning' >Name is Required!!</Alert>
         </Stack>
          }      
            <input name='phone'  placeholder='Phone' value={state.phone} onChange={handleChange} />
            {requiredPhone ? '' : 
           <Stack className='Stack'  spacing={2}>
              <Alert severity='warning' >Phone is Required!!</Alert>
            </Stack>
            }   
            <input name='email' placeholder='Email' value={state.email} onChange={handleChange} />
            {requiredEmail ? '' : 
           <Stack className='Stack'  spacing={2}>
              <Alert severity='warning' >Email is Required!!</Alert>
            </Stack>
              }   
              <br/>
            <Select
              className='SelectTeam'
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti={false}
              options={teams}
              name='team'
              onChange={handleSelect}
            />
      			<button onClick={GenerateQRCode}>Generate</button>
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