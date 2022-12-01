import React from 'react'
import './Middleman.css'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {useNavigate} from 'react-router-dom';

function Middleman() {

    
    const navigate = useNavigate();

    const handleClickScan = (e) => {
        e.preventDefault()
        navigate('/Scan')
    }

    const handleClickView = (e) => {
        e.preventDefault()
        navigate('/View')
    }

  return (
    <div className='login_box'>
        <div className='qr-scanner'>
            <a href="" onClick={handleClickScan}><QrCodeScannerIcon 
            sx={{fontSize: 250}}
            color= "primary"
            /></a>
            <div className='scan_button'>
                <button type="" onClick={handleClickView}>View</button>                
            </div>
        </div>
        
    </div>
  )
}

export default Middleman