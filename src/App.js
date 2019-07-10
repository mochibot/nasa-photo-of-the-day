import React, { useState, useEffect } from "react";
import axios from 'axios';

import Content from './components/Content';
import "./App.css";

function App() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState('')

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY${date}`)
      .then(response => {
        console.log('fetch photo success: ', response)
        setData(response.data)
      }) 
      .catch(error => {
        console.log('error fetching data: ', error)
        setError(error)
      })   
  }, [date])

  const changeDate = (event) => {
    setDate('&date=' + event.target.value);
    console.log(event.target.value);
  }

  /*
  const dateRange = [];
  for (let i = 10; i >= 1; i--) {
    let today = new Date();
    let newDate = new Date(today - i * 24 * 3600 * 1000).toISOString().slice(0, 10)
    dateRange.unshift(newDate);
  }
  dateRange.unshift('today');
  */
  let today = new Date().toISOString().slice(0, 10)

  return (
    <div className="App">
      <h1>NASA Astronomy Picture of the Day</h1>
      <input type='date' defaultValue={today} min='1995-06-16' max={today} onChange={changeDate}/>
      {/*
      <select onChange={changeDate} defaultValue={date}>
        <option disabled>Select a date</option>
        {dateRange.map(item => item === 'today' ? <option key={item} value=''>{item}</option> : <option key={item} value={item} >{item}</option>)}
      </select>
      */}
      {!data ? <div>Loading...</div> : <Content data={data}/>}
      {error && <div>Something went wrong...</div>}
    </div>
  );
}

export default App;
