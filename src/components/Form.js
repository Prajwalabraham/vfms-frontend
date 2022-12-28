import React, { Component } from 'react'
import axios from 'axios';
import './Form.css'
import CircularProgress from '@mui/material/CircularProgress';

class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name: '',
       preference: '',
       phone:'',
       loading: false
    }
  }
  
  toggleLoader = () => {
    if(!this.state.loading){
      this.setState({loading: true})
    }else{
      this.setState({loading: false})
    }
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
    const handleSubmit = async(e) =>{
    e.preventDefault()
    this.setState({loading: true})
    if (this.state.name == '' && this.state.phone == '' && this.state.preference == '') {
      alert("All Inputs are Required!!!")

    }
    else if (this.state.name == '') {
      alert("Name is Required!")
    } else if (this.state.phone=='') {
      alert("Phone is Required!")
    }
    else if (this.state.preference == '') {
      alert("Phone is Required!")
    }
    else{
    console.log(this.state);
    const response = await axios({
      method:'post',
      url: "http://ec2-3-85-163-206.compute-1.amazonaws.com:4000/foodPreference",
      data: this.state
    })
    .then(res => {
      console.log(res);
      if (res.status==201) {
        alert("Successfully Submitted") 
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
        alert("You have already submitted the form this week...!");
      }
      else if(err.response.status==403){
        alert("You need to create QR Code in order to apply for coupons. Kindly contact your team leader!")

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
        <div class="login-box">
          <h2>Food Preference</h2>
          <br />
          <br />
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

        </div>
    )
  }
}

export default Form
