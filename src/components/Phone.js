import React from 'react'
import axios from 'axios'
import QRCode from 'qrcode.react';
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './QrCodeGenerator.css'
import Select from 'react-select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import makeAnimated from 'react-select/animated';
import emailjs from '@emailjs/browser';
import ReactDOM from 'react-dom';
import {QRCodeCanvas} from 'qrcode.react';


export default function Phone() {


  const [inputText, setInputText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');
 
  // generate QR code
  const generateQRCode = () => {
    setQRCodeText(inputText);
  }
 
  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }
 
  return (
    <div className="App">
      <h3>Generate and download a QR code image in React - <a href="https://www.cluemediator.com/" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
      <div className="qr-input">
        <input
          type="text"
          placeholder="Enter input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <input
          type="button"
          value="Generate"
          onClick={generateQRCode}
        />
      </div><div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "50%" }}>
      <QRCode
        id="qrCodeEl"
        size={1000}
        value={qrCodeText}
      />
        
      </div>
      <br />
      <input
        type="button"
        className="download-btn"
        value="Download"
        onClick={downloadQRCode}
      />
    </div>
  );
}
