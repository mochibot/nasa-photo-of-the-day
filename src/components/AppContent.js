import React from 'react';
import Iframe from 'react-iframe';
import { Typography } from 'antd';

const { Text, Paragraph } = Typography;

const Content = (props) => {
  return (
    <div className='App-content'>
      <Text style={{fontSize: '20px', lineHeight: 2.5}}><strong>Title:</strong> {props.data.title}</Text>
      <Text style={{fontSize: '20px', lineHeight: 2.5}}><strong>Date:</strong> {props.data.date}</Text>
      {props.data['media_type'] === 'video' ? <Iframe className='App-content-video'url={props.data.url} width='640px' height='480px'/> : <img className='App-content-image'src={props.data.url} alt='NASA photo of the day'/>}
      <Text style={{fontSize: '20px'}}><strong>Description:</strong><Paragraph ellipsis={{row3: 4, expandable: true}} style={{textAlign: 'justify'}}> {props.data.explanation}</Paragraph></Text>
    </div>

  )
}

export default Content; 