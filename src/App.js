import React, { useState, useEffect } from "react";
import axios from 'axios';

import Content from './components/Content';
import "./App.css";

function App() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(response => {
        console.log('fetch photo success: ', response)
        setData(response.data)
      }) 
      .catch(error => {
        console.log('error fetching data: ', error)
        setError(error)
      })   
  }, [])

  return (
    <div className="App">
      <h1>NASA Astronomy Picture of the Day</h1>
      {!data ? <div>Loading...</div> : <Content data={data}/>}
      {error && <div>Something went wrong...</div>}
    </div>
  );
}

export default App;
