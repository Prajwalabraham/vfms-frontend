import React, { Component } from 'react'
import axios from 'axios';
import './Form.css'

class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name: '',
       preference: '',
       phone:''
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
      url: "https://vfms-server.onrender.com/foodPreference",
      data: this.state
    })
    if (response.status==201) {
      alert("Successfully Submitted") 
    }
    else if (response.status==406) {
      alert("You have already submitted the form this week...!");
    }
    this.setState({
      name: '',
      preference: '',
      phone: ''
    })
  }
  }
    return (
        <div class="login-box">
          <h2>Food Preference</h2>
          <br />
          <br />
          <form onSubmit={handleSubmit} >
            <div class="user-box">
              <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
              <label>Your Name *</label>
            </div>
            <div class="user-box">
              <input type="text" name="phone" value={this.state.phone} onChange={this.handlePhoneChange} />
              <label>Phone Number *</label>
            </div>
            <div class='wrapper'>
              <input type="radio" name="select" id="option-1" value='NON-VEG' checked={this.state.preference === 'NON-VEG'} onChange={this.onValueChange} />
                <input type="radio" name="select" id="option-2" value='VEG' checked={this.state.preference === 'VEG'} onChange={this.onValueChange} />
                  <label for="option-1" class="option option-1">
                    <div class="dot"></div>
                      <span>NON-VEG</span>
                      </label>
                  <label for="option-2" class="option option-2">
                    <div class="dot"></div>
                      <span>VEG</span>
                  </label>
            </div>
            <div>            
            <a href="#" onClick={handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
            </div>
          </form>
        </div>
    )
  }
}

export default Form
