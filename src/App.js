import React, { useState, useEffect } from "react";
import axios from 'axios';
import { DatePicker, Icon, Result, Typography, Layout } from 'antd';
import moment from 'moment';

import AppContent from './components/AppContent';
import "./App.css";
import 'antd/dist/antd.css';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

function App() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState('')

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=F2DZQ9hmcUVIKQxZ5bqZJc5D4nM6FeK6ToHhw5JR${date}`)
      .then(response => {
        console.log('fetch photo success: ', response)
        setData(response.data)
      }) 
      .catch(error => {
        console.log('error fetching data: ', error)
        setError(error)
      })   
  }, [date])

  const changeDate = (dateObj, dateString) => {
    //setDate('&date=' + event.target.value); 
    let today = new Date().toISOString().slice(0, 10)
    if (dateString === today) {
      setDate('');
    } else if (dateString !== '') {
      setDate('&date=' + dateString);
    }
    console.log(date, dateString);
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
  
  const disabledDate = (date) => {
    return date < moment("19950616", "YYYYMMDD") || date > moment().endOf('day')
  }

  return (
    <div className="App">
      <Layout>
        <Header>
          <Title level={2} style={{color: 'white', padding: '9px'}}>NASA Astronomy Picture of the Day</Title>
        </Header>
        <Content>
          <Text style={{fontSize: '20px', lineHeight: 2.5}}>Select another date to view more pictures</Text>
          <br />
          <DatePicker disabledDate={disabledDate} onChange={changeDate} style={{width: '278px'}}/>
          {/*
          <select onChange={changeDate} defaultValue={date}>
            <option disabled>Select a date</option>
            {dateRange.map(item => item === 'today' ? <option key={item} value=''>{item}</option> : <option key={item} value={item} >{item}</option>)}
          </select>
          */}
          <br />
          {!data ? <Icon type="sync" style={{ fontSize: 30, margin: '40px' }} spin /> : <AppContent data={data}/>}
          <br />
          {error && <Result status='warning' title='Something went wrong...'></Result>}
        </Content>
        <Footer style={{background: '#001529', color: 'white', fontSize: '20px'}}>
          All images/videos obtained from <a href='https://api.nasa.gov/index.html'>api.nasa.gov</a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
