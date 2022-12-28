import React, {useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import './Scanner.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Scanner = (props) => {
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [res, setRes] = useState({
    name: '',
    taken: false,
    preference: '',
    team: ''
  });
  const [isverifying, setisverifying] = useState(false);
  useEffect(() => {
    document.title = 'QR Scanner';
  }, []);

  const navigate = useNavigate()
  
  const handleScan = async(scanData) => {
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      setLoadingScan(true);
      console.log(`loaded >>>`, scanData);
      const resData= JSON.parse(scanData)
      console.log(resData);
      setStartScan(false);
      setData(resData);
  setLoadingScan(false);
      
  };
}

  const View = (e) => {
    navigate('/View')
  }

  const handleError = (err) => {
    console.error(err);
  };
  
  const handleVerify = async(e) =>{
    console.log(data)
    setisverifying(true)

    const response = await axios({
      method:'post',
      url: 'https://174.129.136.204/verify',
      data: data
  }).then(res => {
    console.log(res);
    if (res.status == 201) {
     
      navigate('/Success', {
        state:{
          name:res.data.resName,
          taken:res.data.resTaken,
          preference:res.data.resPreference,
          team:res.data.resTeam,
        }
      })
    }
    else{
      alert("There is an internal Server error. Kindly report to the IT team")
    }
  }).catch(err => {
    if (err.response.status == 400) {
      alert('Volunteer has not applied for coupons this week.')
    }
    else if (err.response.status == 401) {
      alert("The Volunteer has already taken food")
    }
    else{
      alert('There is an internal Server error. Kindly report to the IT team')

    }
  })
  setisverifying(false)
    // setPrecScan(scanData);
  }
  
  



  return (
    <div className="login-box">
    <h2>
      Scanner
    </h2>

    <button className='scanButton'
      onClick={() => {
        setStartScan(!startScan);
        setData('')
      }}
    >
      {startScan ? "Stop Scan" : "Start Scan"}
    </button>
    {startScan && (
      <>
        <QrReader
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          // chooseDeviceId={()=>selected}
          style={{ width: "100%", height: "100%" }}
        />
      </>
    )}
    {loadingScan ? 
    <CircularProgress />
    : ''}

    {data == ""? '':''
        }
    {data !== "" && <table className='tTable'>
        <tbody className='Ttbody' >
          <tr className='Ttr'><p>Name</p>
          <td className='Ttd' >{data.state.name}</td>
          </tr>
          
          <tr className='Ttr'><p>Team</p>
          <td className='Ttd'>{data.team}</td>
          </tr>
          
        </tbody>
      </table>}
    {isverifying?
    <CircularProgress /> : '' }
    {data !=="" && <button className='scanButton' type="" onClick={handleVerify} >Verify</button>}
    <button className='scanButton' onClick={View}>View</button>
  </div>
  );
};

export default Scanner;