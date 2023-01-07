import React, { Component } from 'react'
import axios from 'axios';
import './Form.css'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name: '',
       preference: '',
       phone:'',
       loading: false,
       error: false,
       errMsg: '',
       success:false,
       isSat:false
    }
  }
  
  
  toggleLoader = () => {
    if(!this.state.loading){
      this.setState({loading: true})
    }else{
      this.setState({loading: false})
    }
 }
 componentDidMount() {
  var curTime = new Date();
  var day = curTime.getDay();
  curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

  if (curTime > 131500 && day == 6 )
    this.setState({isSat:true})
  else
    this.setState({isSat:false})
}
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  
  onValueChange = (e) => {
    this.setState({
      preference: e.target.value
    })
  }

  
  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  


  render() {

    const handleError = (e) => {
      this.setState({
        error:false,
        errorMsg: ''
      })
    }
    
    const handleSuccess = (e) => {
      this.setState({
        success:false
      })
    }

    const handleSubmit = async(e) =>{
    e.preventDefault()
    this.setState({loading: true})
    if (this.state.name == '' || this.state.phone == '' || this.state.preference == '') {
      alert("All Inputs are Required!!!")

    }
    else{
    const response = await axios({
      method:'post',
      url: "https://174.129.136.204/foodPreference",
      data: this.state
    })
    .then(res => {
      if (res.status==201) {
        this.setState({success:true})
      }
      this.setState({
        name: '',
        preference: '',
        phone: '',
        loading: false
      })
      
    })
    .catch(err => {
      console.log(err);
      if (err.response.status==406) {
        this.setState({error:true})
        this.setState({errorMsg:'You have already submitted the form this week...!'})
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
  
  this.setState({
    name: '',
    preference: '',
    phone: '',
    loading: false

  })
  }
    return (
      <>
      {this.state.isSat?
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
          {this.state.error?
          
          <div className='Formimg'>
           <span><img src="https://user-images.githubusercontent.com/74299799/209782507-c470b66c-4666-481a-a187-01ddc9992625.png" alt={<ErrorOutlineOutlinedIcon sx={{ fontSize: 210 }}  style={{ color: "red" }} />} /></span>
           <br/>
           <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {this.state.errorMsg}
            </Alert>
          </Stack>
           <button type="" onClick = {handleError}>Back</button>

          </div>
          : 
          <>
          {this.state.success? 
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
            <div class="user-box">
              <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} required='true'/>
              <label>Your Name *</label>
            </div>
            <div class="user-box">
              <input name="phone" type='tel' pattern="(6|7|8|9)\d{9}$"  value={this.state.phone} onChange={this.handlePhoneChange} required='true' />
              <label>Phone Number *</label>
            </div>
            <div class='wrapper'>
              <input type="radio" name="select" id="option-1" value='NON-VEG' checked={this.state.preference === 'NON-VEG'} onChange={this.onValueChange} />
                <input type="radio" name="select" id="option-2" value='VEG' checked={this.state.preference === 'VEG'} onChange={this.onValueChange} />
                  <label for="option-1" className="option option-1">
                      <span><img src="https://user-images.githubusercontent.com/74299799/209433785-40cc2619-acc3-41b2-adc6-c6cc09144c38.png" alt='NON-VEG' /></span>
                      </label>
                  <label for="option-2" className="option option-2">
                      <span><img src="https://user-images.githubusercontent.com/74299799/209433786-f261fed6-427b-409a-96b5-6cf58deadef9.png" alt='' /></span>
                  </label>
            </div>
            <div> 
            {this.state.loading ?  <CircularProgress /> :            
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
}

export default Form
