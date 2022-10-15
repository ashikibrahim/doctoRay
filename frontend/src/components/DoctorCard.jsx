import React from 'react';
import {Card} from 'antd';
const { Meta } = Card;

function DoctorCard({doctor1}) {
  return (
    
        <Card
        hoverable
        style={{
          width: 300,
          borderRadius:"8px",
          height:300
          
          
        }}
        cover={<img alt="example" src={doctor1.image}/>}
      >
        <Meta  title={doctor1.firstName} description={doctor1.lastName} />
      </Card>
      )
    
}

export default DoctorCard

