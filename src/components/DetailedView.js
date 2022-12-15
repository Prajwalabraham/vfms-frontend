import React, {useState} from 'react'
import './DetailedView.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function DetailedView() {
    
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
    const viewData = async(e) =>{
        setLoading(true)
        const result = await axios({
          method:'post',
          url: 'https://vfms-server.onrender.com/viewKitchen',
        }).then(response => {
          setData(response.data);
          console.log(data);  
        })
        setLoading(false)
    }
    
      const Back = (e) => {
        
        navigate('/Scan')
      }

  return (
    <div>DetailedView</div>
  )
}

export default DetailedView