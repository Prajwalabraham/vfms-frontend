import React, { Component } from 'react'
import axios from 'axios';
import './Form.css'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Svg from './Ok.gif'
import SorrySvg from './Feeling sorry.gif'

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
       isSat:false,
       data:[]
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

  if (curTime > 103000 && day == 6 )
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
        errorMsg: '',
        data:[]
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
      console.log(res);
      if (res.status==201) {
        this.setState({success:true})
        this.setState({
          data:res.data.rows[0]
        },
        ()=>{
          console.log(this.state.data);
        }
        )
      }
      
    })
    .catch(err => {
      console.log(err);
      if (err.response.status==406) {
        this.setState({error:true})
        this.setState({errorMsg:'But you have already given your food choice for this week as'})
        this.setState({
          data: err.response.data.rows[0],
        },
        ()=>{
          console.log(this.state.data);
        }
        )
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
          <span><img src={SorrySvg} alt={<ErrorOutlineOutlinedIcon sx={{ fontSize: 210 }}  style={{ color: "red" }} />} style={{borderRadius: '50%'}} /></span>
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
          <span><img src={SorrySvg} alt="" style={{borderRadius: '50%'}}/> </span>
           <br/>
           <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Oops!!</AlertTitle>
              <span style={{display:"block"}}>Sorry {this.state.data.name},</span>
              <span> {this.state.errorMsg} </span>
              <strong>{this.state.data.preference}</strong>
            </Alert>
          </Stack>
           <button type="" onClick = {handleError}>Back</button>

          </div>
          : 
          <>
          {this.state.success? 
           <div className='Formimg'>
           <span><img src={Svg} alt="" style={{borderRadius: '50%'}}/></span>
           <br/>
           <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">
              <AlertTitle><strong>Successfully Submitted</strong></AlertTitle>
              <br/>
              <span style={{display:"block"}} >Hey {this.state.data.name},</span>
              <br/>
              <span> Thank you for Submitting </span>
              <strong>Your choice is {this.state.data.preference}</strong>
            </Alert>
          </Stack>
           <button type="" onClick = {handleSuccess}>Back</button>

          </div>
          :

          <form onSubmit={handleSubmit} >
            <div className="user-box">
              <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} required='true'/>
              <label>Your Name *</label>
            </div>
            <div className="user-box">
              <input name="phone" type='tel' pattern="(6|7|8|9)\d{9}$"  value={this.state.phone} onChange={this.handlePhoneChange} required='true' />
              <label>Phone Number *</label>
            </div>
            <div className='wrapper'>
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
