import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './SForm.css'
import './Form.css'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function SForm() {


const [state, setState] = useState({
  name:'',
  preference: '',
  phone: ''
});

const [loading, setloading] = useState(false);
const [error, seterror] = useState(false);
const [success, setsuccess] = useState(false);
const [isSat, setisSat] = useState(false);
const [errMsg, seterrMsg] = useState();
const [msg, setmsg] = useState();
  
function handleChange(event) {
  const res = event.target.value;
  setState({
      ...state,
      [event.target.name]: res
  })
}

const handleError = (e) => {
    seterror(false)
    seterrMsg()
  }
  
  
  const toggleLoader = (e) => {
    if(!loading){
      setloading(true)
    }else{
      setloading(false)
    }
 }


 const handleNameChange = (e) => {
  setState({
    name: e.target.value
  })
}

const onValueChange = (e) => {
  e.preventDefault()
  setState({
    preference: e.target.value
  })
}


const handlePhoneChange = (e) => {
  setState({
    phone: e.target.value
  })
}




  const handleSuccess = (e) => {
    setsuccess(false)
  }

  const handleSubmit = async(e) =>{
  e.preventDefault()
  console.log(state);
  setloading(true)
  if (state.name == '' || state.phone == '' || state.preference == '') {
    alert("All Inputs are Required!!!")

  }
  else{
  const response = await axios({
    method:'post',
    url: "https://174.129.136.204/foodPreference",
    data: this.state
  })
  .then(res => {
    console.log(res);
    if (res.status==201) {
      seterrMsg('hi')
      console.log(msg);
      setsuccess(true)
    }
    setState({
      name: '',
      preference: '',
      phone: '', 
    })
    setloading(false)
    
  })
  .catch(err => {
    console.log(err);
    if (err.response.status==406) {
      this.setState({error:true})
      this.setState({errorMsg:'You have already submitted the form this week...!'})
      this.setState({msg: err})
      console.log(this.state.msg);
    }
    else if(err.response.status==403){
      this.setState({error:true})
      this.setState({errorMsg:"You need to create QR Code in order to apply for coupons. Kindly contact your team leader!"})

    }
    else{
      alert('There is an internal Server error. Kindly report to the IT team')
    }
  })

}


}



  return (
    <>
      i{isSat?
      <>
       <div class="login-box">
       <h2>Food Preference</h2>
       <br />
       <br />
        <div className='Formimg'>
          <span><img src="https://user-images.githubusercontent.com/74299799/209782507-c470b66c-4666-481a-a187-01ddc9992625.png" alt={<ErrorOutlineOutlinedIcon sx={{ fontSize: 210 }}  style={{ color: "red" }} />} /></span>
          <br/>
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Time Up!</AlertTitle>
            <bold>The form is no longer aceepting Responses...!!</bold>
          </Alert>
        </Stack>
        </div>
       </div>
      </>
      :

        <div class="login-box">
          <h2>Food Preference</h2>
          <br />
          <br />
          {error?
          
          <div className='Formimg'>
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
           <div className='Formimg'>
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

          <form onSubmit={handleSubmit} >
            <div className="user-box">
              <input type="text" name="name" value={state.name} onChange={handleChange} required='true'/>
              <label>Your Name *</label>
            </div>
            <div className="user-box">
              <input name="phone" type='tel' pattern="(6|7|8|9)\d{9}$"  value={state.phone} onChange={handleChange} required='true' />
              <label>Phone Number *</label>
            </div>
            <div className='wrapper'>
              <input type="radio" name="select" id="option-1" value='NON-VEG' checked={state.preference === 'NON-VEG'} onChange={onValueChange} />
                <input type="radio" name="select" id="option-2" value='VEG' checked={state.preference === 'VEG'} onChange={onValueChange} />
                  <label for="option-1" className="option option-1">
                      <span><img src="https://user-images.githubusercontent.com/74299799/209433785-40cc2619-acc3-41b2-adc6-c6cc09144c38.png" alt='NON-VEG' /></span>
                      </label>
                  <label for="option-2" className="option option-2">
                      <span><img src="https://user-images.githubusercontent.com/74299799/209433786-f261fed6-427b-409a-96b5-6cf58deadef9.png" alt='' /></span>
                  </label>
            </div>
            <div> 
            {loading ?  <CircularProgress /> :            
            <button type="submit">Submit</button>
  }
            </div>
          </form> 
  }
          </>
  }

        </div>
}
</>
  )
}

export default SForm