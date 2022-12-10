import React, {useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import './Scanner.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Scanner = (props) => {
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    document.title = 'QR Scanner';
  }, []);
  
  const handleScan = async(scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setStartScan(false);
      setData(scanData);
      setLoadingScan(false);
   
      // setPrecScan(scanData);
    }
  };


  const handleError = (err) => {
    console.error(err);
  };

  const handleVerify = async(e) =>{
    const verifyData = JSON.parse(data)
    console.log(verifyData)
    const response = await axios({
      method:'post',
      url: 'https://vfms-backend.onrender.com/verify',
      data: verifyData
  })
  if (response.status==201) {
    alert("Successfully Verifed")
  }
  }



  return (
    <div className="login-box">
    <h2>
      Scanner
    </h2>

    <button
      onClick={() => {
        setStartScan(!startScan);
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
          style={{ width: 260, height: "100%" }}
        />
      </>
    )}
    {loadingScan && <p>Loading</p>}
    {data !== "" && <p>{data}</p>}
    {data !=="" && <button type="" onClick={handleVerify} >Verify</button>}
  </div>
  );
};

export default Scanner;