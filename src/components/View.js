import React, {useState} from 'react';
import './View.css';
import axios from 'axios';
import {useTable} from 'react-table';


function View() {

  const [data, setData] = useState([]);

  const viewData = async(e) =>{
    const result = await axios({
      method:'get',
      url: 'https://vfms-server.onrender.com/viewKitchen',
    }) 
    setData(result);
  }


  return (
    <div>
      
    </div>
  )
}

export default View