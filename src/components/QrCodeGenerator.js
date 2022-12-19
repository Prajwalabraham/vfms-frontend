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
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
	const [qr, setQr] = useState('')

	const GenerateQRCode = (e) => {
    e.preventDefault()
    if (state.name == '' && state.phone == '' && state.email == '') {
      setValidName(false)
      setValidPhone(false)
      setValidEmail(false)
    }
    else if (state.name == '') {
      setValidName(false)
    } else if (state.phone=='') {
      setValidPhone(false)
    }
    else if (state.email == '') {
      setValidEmail(false)
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
      console.log(data);
		})
    
    setValidName(true)
    setValidPhone(true)
    setValidEmail(true)
  }
	}


    function handleChange(event) {
        const res = event.target.value;
        setState({
            ...state,
            [event.target.name]: res
        })
        setValidName(true)
        setValidPhone(true)
        setValidEmail(true)
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
   // }
      setState({
        name:'',
        phone:'',
        email:''
      })
      setTeam('')
      setLoading(false)
    }

    
      // download QR code
    
  return (
    <div className='login-box'>
        <form>
          <input name='name'  placeholder='Name' value={state.name} onChange={handleChange} />
          {validName ? '' : 
           <Stack className='Stack'  spacing={2}>
           <Alert severity='warning' >Name is Required!!</Alert>
         </Stack>
          }      
            <input name='phone'  placeholder='Phone' value={state.phone} onChange={handleChange} />
            {validPhone ? '' : 
           <Stack className='Stack'  spacing={2}>
              <Alert severity='warning' >Phone is Required!!</Alert>
            </Stack>
            }   
            <input name='email' placeholder='Email' value={state.email} onChange={handleChange} />
            {validEmail ? '' : 
           <Stack className='Stack'  spacing={2}>
              <Alert severity='warning' >Email is Required!!</Alert>
            </Stack>
              }   
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