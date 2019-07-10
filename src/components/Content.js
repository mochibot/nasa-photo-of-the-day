import React from 'react';
import Iframe from 'react-iframe';

const Content = (props) => {
  return (
    <div className='App-content'>
      <div>Title: {props.data.title}</div>
      <div>Date: {props.data.date}</div>
      {props.data['media_type'] === 'video' ? <Iframe className='App-content-video'url={props.data.url} width='512px' height='384px'/> : <img className='App-content-image'src={props.data.url} alt='NASA photo of the day'/>}
      <div>Description: {props.data.explanation}</div>
    </div>

  )
}

export default Content; 