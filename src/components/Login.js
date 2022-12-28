import React from 'react'
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {useAuth} from './auth'
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
    const [state, setState] = React.useState({
        username: '',
        password: '',
        email: '',
    })
    const auth = useAuth()
    const [comment, setComment] = React.useState();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }

    const handleSignupSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        console.log(state);
        setState({
            username:'',
            password:'',
            email:''
        })
        const response = await axios({
            method:'post',
            url: 'https://174.129.136.204/signup',
            data: state
        }).then(res =>{
            if (res.status==201) {
                alert("User Successfully Created!")
            }
        }).catch(err => {
            if (err.response.status == 400) {
                alert("User is already registered")
            }
        })
        setLoading(false)
    }

    
    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        console.log(state);
        const response = await axios({
            method:'post',
            url: 'https://174.129.136.204/login',
            data: state
        })
        .then(res => {
            if(res.status == 200){
                auth.login(state.email)
                console.log(res.data);
                navigate('/Middle', {replace:true})
            }
        }).catch(err => {
            if (err.response.status==403) {
                alert("The Username or Password is Incorrect");
              }
            else if (err.response.status==401) {
                alert("User doesn't Exist. Signup First")
            }
              else{
                alert('There is an internal Server error. Kindly report to the IT team')
              }
        })


        
        setState({
            username:'',
            password:'',
            email:''
        })
        
        setLoading(false)
        //console.log(comment);

    }
    React.useEffect(() => {
        console.log(comment)
    }, [comment])
    
  return (
    <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="signup">
				<form onSubmit = {handleSignupSubmit}>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="username" placeholder="User name" required="" onChange={handleChange} value={state.username} />
					<input type="email" name="email" placeholder="Email" required="" onChange={handleChange} value={state.email} />
					<input type="password" name="password" placeholder="Password" required="" onChange={handleChange} value={state.password} />
					{loading ?  <CircularProgress /> :
                    <button>Sign up</button>
  }
				</form>
			</div>

			<div className="login">
				<form onSubmit = {handleLoginSubmit}>
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" required="" onChange={handleChange} value={state.email} />
					<input type="password" name="password" placeholder="Password" required="" onChange={handleChange} value={state.password} />
                    {loading ?  <CircularProgress /> :
					<button>Login</button>
}
				</form>
			</div>
	</div>
  )
}

export default Login